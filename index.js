const { Command } = require("commander");
const contact = require('./contacts');

// // listContacts()
// //    .then(data => {
// //         console.log(data);
// //     }).catch(err => console.error(err));

//     const argv = require("yargs").argv;

   

    // TODO: рефакторить
    async function invokeAction({ action, id, name, email, phone }) {
      switch (action) {
        case "list":
          const listContacts = await contact.listContacts();
          console.log(listContacts);
          break;
    
        case "get":
          const getContact = await contact.getContactById(id);
          console.log(getContact);
          break;
    
        case "add":
          const newContact = await contact.addContact({id, name, email, phone});
          console.log(newContact);
          break;
    
        case "remove":
          const removeContact = await contact.removeContact(id);
          console.log(removeContact);
          break;
    
        default:
          console.warn("\x1B[31m Unknown action type!");
      }
    }

    const program = new Command();

   program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

   program.parse(process.argv);

   const argv = program.opts();

   invokeAction(argv);
    
   //  const actionIndex = process.argv.indexOf('--action');
    
   //  if(actionIndex !== -1) {
   //    const action = process.argv[actionIndex + 1];
   //    const id = process.argv[actionIndex + 2];
   //    const name = process.argv[actionIndex + 3];
   //    const email = process.argv[actionIndex + 4];
   //    const phone = process.argv[actionIndex + 5];

   //    invokeAction({ action, id, name, email, phone });
   //  }



  
   
