const Contact = require('../model/Contact')

module.exports = {

  addContact: async function (req, res) {
    try {
      const { name, email, mobileNumber } = req.body;
      const mobileExist = await Contact.findOne({ mobileNumber: mobileNumber });
      if (mobileExist) return res.status(400).send({ sucess: false, message: 'mobileAlreadyExist', data: null });
      const contact = new Contact({
        name: name,
        email: email,
        mobileNumber: mobileNumber
      })
      await contact.save()
      return res.status(200).send({ sucess: true, message: 'contactAddedSuccessfully', data: contact})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ sucess: true, message: 'SomethingWentWrong', data: error})
    }
  },

  updateContact: async function (req, res) {
    try {
      const contact = await Contact.findOne({ _id: req.params.id});
      if(!contact) return res.status(404).send({ sucess: false, message: 'DataNotFound', data: null });
      contact.name = req.body.name || '',
      contact.email = req.body.email || '',
      contact.mobileNumber = req.body.mobileNumber || ''
      await contact.save();
      return res.status(200).send({ sucess: true, message: 'contactUpdatedSuccessfully', data: contact})
    } catch (error) {
      console.log(error)
      return res.status(500).send({ sucess: true, message: 'SomethingWentWrong', data: error})
    }
  },

  getContacts: async function (req, res) {
    let query = {};
    var offset = req.query.page ? (req.query.page - 1) * req.query.limit : 0;
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    if (!query.$and) {
        query.$and = [];
    }  
    if (req.query.name) {
      var name = req.query.name;
      query.$and.push({ '$or': [{ name: { $regex: new RegExp(name.toLowerCase(), 'i') } }, { email: { $regex: new RegExp(name.toLowerCase(), 'i') } }, { mobileNumber: { $regex: new RegExp(name.toLowerCase(), 'i') } }] });
    }
    if (!query.$and.length) {
        query = {};
    }
    try {
      const [totalCount, contacts] = await Promise.all([
          Contact.countDocuments(query).exec(),
          Contact.find(query).sort('-createdAt').skip(parseInt(offset)).limit(parseInt(limit)).exec()
      ]);
      return res.status(200).send({ success: true, message: 'Success', data: contacts, totalCount: totalCount });
    } catch (err) {
      console.error('Error fetching contacts:', err);
      return res.status(500).send({ success: false, message: 'Something went wrong', data: err });
    }
  },

  getContact: async function(req, res) {
    try {
      const contact = await Contact.findOne({ _id: req.params.id });
      if(!contact) return res.status(404).send({ success: false, message: 'DataNotFound', data: null })
      return res.status(200).send({ success: true, message: 'Success', data: contact })
    } catch (error) {
      return res.status(500).send({ success: false, message: 'Something went wrong', data: err });
    }
  },
  
  deleteContact: async function(req, res) {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send({ success: false, message: 'DataNotFound', data: null });
        }
        await Contact.deleteOne({ _id: req.params.id });
        return res.status(200).send({ success: true, message: 'ContactDeletedSuccessfully', data: null });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return res.status(500).send({ success: false, message: 'Something went wrong', data: error });
    }
  }
};
