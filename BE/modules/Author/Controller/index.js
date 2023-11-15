import getAllAuthors from "./Api/getAllAuthor.js"
import getOneAuthors from "./Api/getOneAuthor.js"
import removeAuthor from "./Api/removeAuthor.js"
import updateAuthors from "./Api/updateAuthor.js"
import addAuthors from "./Api/addAuthor.js"
const authorController={
   getAllAuthors,
   getOneAuthors,
   removeAuthor,
   updateAuthors,
   addAuthors
}
export default authorController