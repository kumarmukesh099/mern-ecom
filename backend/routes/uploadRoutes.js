import express from 'express';
import path from 'path';
import multer from 'multer';
const router = express.Router();


const storage = multer.diskStorage({ //initialise our storage engine
    destination(req,file,cb){
        cb(null,'uploads/') //no error so null and where we need to uploads
        
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) //pull off the extension extname
    }
})



function checkFileType(file,cb){
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimeType);

    if(extname && mimeType){
        cb(null,true)
    }else{
        cb('Images Only');
    }
}

const upload = multer({
    storage
})

router.post('/',upload.single('image'),(req,res)=>{
    console.log("dataaaa",`/${req.file.path}`)
    res.send(`/${req.file.path}`)
})

export default router;  