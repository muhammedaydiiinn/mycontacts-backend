const asyncHandler = require('express-async-handler');

// @desc Get all contacts
// @route GET /api/contacts
// @access Public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ messages : 'Get all contacts'});
});

// @desc Create new contact
// @route POST /api/contacts
// @access Public
const createContact = asyncHandler(async (req, res) => {
    console.log("Request Body: " + JSON.stringify(req.body));
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('Please fill all fields');
    }
    res.status(201).json({ messages : 'Create contact'});
});

// @desc Get single contact
// @route GET /api/contacts/:id
// @access Public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ messages : `Get contact for ${req.params.id}`});
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access Public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ messages : `Update contact for ${req.params.id}`});
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ messages : `Delete contact for ${req.params.id}`});
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};