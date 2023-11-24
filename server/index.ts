import server from 'bunrest';
const port = process.env.PORT || 3000;
import app from './app'

app.listen(port, () => {
 console.log("Server started on port 3000");
})