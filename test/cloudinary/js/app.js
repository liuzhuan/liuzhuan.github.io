$.cloudinary.config({ cloud_name: 'sample', api_key: '874837483274837' });

$(function(){
    if ($.fn.cloudinary_fileupload !== undefined) {
        $('input.cloudinary-fileupload[type=file]').cloudinary_fileupload();
    }
});