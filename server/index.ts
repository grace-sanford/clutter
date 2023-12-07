const port = process.env.PORT;
import app from "../src/pages/api"

const init = async () => {
    try {
      if(process.env.SEED === 'true'){
        await seed();
      }
      else {
        await db.sync()
      }
      // Start listening (and create a 'server' object representing our server)
      app.listen(port, () => console.log(`Mixing it up on port ${port}`))
    } catch (ex) {
      console.log(ex)
    }
  }
  
  init()

// app.listen(port, () => {
//  console.log("Server started on port 8000");
// })