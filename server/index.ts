const port = process.env.PORT;
import app from "../api"
// const db = require("./db/database").default;

// const init = async () => {
//     try {
//       if(process.env.SEED === 'true'){
//         await seed();
//       }
//       else {
//         await db.sync()
//         console.log("Sucess syncing!")
//       }
//       // Start listening (and create a 'server' object representing our server)
//       app.listen(port, () => console.log(`Mixing it up on port ${port}`))
//     } catch (ex) {
//       console.log(ex)
//     }
//   }
  
//   init()

app.listen(port, () => {
 console.log("Server started on port 8000");
})