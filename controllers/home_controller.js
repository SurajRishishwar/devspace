const post =require('../models/feed');
module.exports.home= async function(req,res){
    if(req.cookies.Devspace){
        res.redirect('/users/homeinside');
    }
    else{
        let feed= await post.find({}).populate('user').sort('-createdAt');
        return res.render('dev_homme',{
            title:"Home",
            isAdded:'',
            feed:feed
            
        });
    }
}