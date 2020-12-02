const express = require('express');
const router = express.Router();

const QRCode = require('qrcode')

// GET home page.
router.get('/qr/:value/qr.png', function(req, res, next) {


	console.log(req)
	
	console.log('VALUE: ', req.params.value)
	
	


	//QRCode.toFile(req.params.value, function (err, url) {
	//	console.log(url)
	//})
	
	QRCode.toFile(`public/images/members/qr/${req.params.value}.png`, req.params.value, {
		color: {
			dark: '#00F',  // Blue dots
			light: '#0000' // Transparent background
		},
		width: 500
	}, function (err) {
	if (err) throw err
	console.log('done')
	})


	res.render('public/index')

});


module.exports = router;