const port = process.env.PORT;
import app from "../src/pages/api"

app.listen(port, () => {
 console.log("Server started on port 8000");
})