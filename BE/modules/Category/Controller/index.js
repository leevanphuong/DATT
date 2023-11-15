import getAllCategorys from "./Api/getAllCategory.js";
import getOneCategorys from "./Api/getOneCategory.js";
import deleteCategorys from "./Api/deleteCategory.js";
import addCategorys from "./Api/addCategory.js";
import editCategory from "./Api/updateCategory.js";
const categoryController={
    getAllCategorys,
    getOneCategorys,
    deleteCategorys,
    addCategorys,
    editCategory
}
export default categoryController