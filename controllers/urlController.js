const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/url');


exports.shortenUrl = async(req, res) => {

    //Check baseUrl
    const baseUrl = config.get('baseUrl');

    if(!validUrl.isUri(baseUrl)){
        return res.status(400).json('Base-Url is not valid');
    }

    //Check longUrl
    const {longUrl} = req.body;

    if(!validUrl.isUri(longUrl)){
        res.status(400).json('Long-Url is not valid');
    }else{
        try{
            let url = await Url.findOne({longUrl});
            if(url){
                return res.status(200).json(url);
            }else{
                let urlCode = shortid.generate();
                let shortUrl = `${baseUrl}/${urlCode}`;
                url = new Url({
                    urlCode,
                    longUrl,
                    shortUrl,
                    date: new Date()
                })
                await url.save();
                res.status(200).json(url);
            }
        }catch(err){
            res.status(500).json('Server Error: failed to create short-Url')    
        }

    }
} 

exports.getLongUrl= async(req, res) => {
    try{
    let url = await Url.findOne({urlCode: req.params.code});
        if(url){
            return res.redirect(url.longUrl);
        }else{
            res.status(400).json('This Url can not be found');
        }
    }catch(err){
        return res.status(500).json('Server Error: Can not fetch long url');
    }
}
