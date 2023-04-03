const { nanoid } = require('nanoid');

const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, './db/contacts.json');



async function listContacts() {
      const data = await fs.readFile(contactsPath, "utf-8");
      return JSON.parse(data);
  } 


  function updateContacts(contacts) {
   return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  }


 async function getContactById(contactId) {
   const contacts = await listContacts();
   const contact = contacts.find(contact => contact.id === contactId);
   return contact;
 }


 async function addContact(contact) {
   const contacts = await listContacts();
   const newContacts = {...contact, id: nanoid(21)};
   contacts.push(newContacts);
   await updateContacts(contacts);
   return newContacts;
 }
 

 async function removeContact(contactId) {
   const contacts = await listContacts();
   const contactIndex = contacts.findIndex(contact => contact.id === contactId);
   if (contactIndex === -1) {
      return null;
    }
   console.log('removeContact', contactIndex);
   const result = contacts.splice(contactIndex, 1);
   await updateContacts(contacts);
   return result;
 }


module.exports = {
   listContacts,
   getContactById,
   addContact,
   removeContact,
}

// node index.js -a list
// node index.js -a get -i "ZoXMgqgSMLtkrmSIk8dDp"
// node index.js -a add -n "Donald Trump" -e "donald.trump@gmail.com" -p "(201) 123-4565"
// node index.js -a remove -i