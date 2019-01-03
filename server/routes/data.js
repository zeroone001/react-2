
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let Model = require('../mongoose.js');


let dataBase = null;

/**
 * 通过Promise读取存储的数据,确保有数据后再执行其他操作
 * @return {null} [无]
 */
let readFileData = () => {
	let promise = new Promise((resolve, reject) => {
		fs.readFile("./public/database/database.json", "utf-8", (err, data) => {
			if(err) {
				console.log(err);
				reject("read filedata error!");
			}else {
				data = JSON.parse(data);
				dataBase = data;
				resolve();
			}
		})
	});
	return promise;
}
// fs.readFile("./public/images/like/like1.jpg", )

/**
 * 通过Promise获取文件名
 * @param  {String} path      [文件的路径名]
 * @param  {String} fileClass [文件所属的种类,用于区别请求]
 * @return {null} [无]
 */
let getFileName = (path, fileClass) => {
	let promise = new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
	        if (err) {
	            reject("read fileName err!")
	        } else {
	        	files = files.map((file) => {
	        		return "http://localhost:3000/images/" + fileClass + "/" + file;
	        	});
	        	resolve(files);
	        }
	    });
	});
	return promise;
}

let imgNames = [];
let appNames = [];
let spikeNames = [];
let moreNames = [];
let likeNames = [];
let feedNames = [];

readFileData().then(() => {
	// getFileName("./public/images/swiper", "swiper").then((files) => {
	// 	imgNames = files;
	// },() => {
	// 	console.log(err);
	// 	imgNames = false;
	// });

	getFileName("./public/images/otherapp", "otherapp").then((files) => {
		let obj = dataBase.otherapp;
		appNames = files.map((file, index) => {
			obj[index].icon = file;
			return obj[index];
		});
	},() => {
		console.log(err);
	});

	getFileName("./public/images/spike", "spike").then((files) => {
		let obj = dataBase.spike.store;
		spikeNames = files.map((file, index) => {
			obj[index].icon = file;
			return obj[index];
		});
	},() => {
		console.log(err);
	})

	getFileName("./public/images/more", "more").then((files) => {
		moreNames = files.map((file, index) => {
			return {
				icon: file,
				url: dataBase.more[index],
			}
		});
	},() => {
		console.log(err);
	})

	getFileName("./public/images/like", "like").then((files) => {
		let obj = dataBase.like;
		likeNames = files.map((file, index) => {
			obj[index].icon = file;
			return obj[index];
		})
	},() => {
		console.log(err);
	})

	// feedNames
	feedNames = dataBase.listData;

}, (err) => {
	console.log(err);
})


exports.swiper = async (req, res, next) => {
	try {
		let reg = /\?callback=(.*)/;
		let callback = reg.exec(req.url)[1];
		const sendData = {
			status: 0,
			msg: "",
			data: "",
		}
		// 如果要实现更多更完整的Promise功能，可以在操作方法后加上exec()。但依然是阉割版。
		var _data = await Model.swiperModel.find().exec();
		console.log('_data', _data);
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = _data[0].imgUrls;
		let json = JSON.stringify(sendData);
		res.send(callback + '(' + json + ')');
	} catch (err) {
		next(err);
	}

};

exports.otherapp = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}

	if(appNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = appNames;

	}else {
		sendData.msg = "error";
	}


	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.spike = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
		times: "",
		more: "",
	}

	if(spikeNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = spikeNames;
		sendData.times = dataBase.spike.times;
		sendData.more = dataBase.spike.more;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.more = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}

	if(moreNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = moreNames;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.like = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}

	if(likeNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = likeNames;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.feed = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	console.log('req.url', req.url);
	const sendData = {
		status: 0,
		msg: "",
		data: []
	}
	// if (feedNames) {
	// 	sendData.status = 1;
	// 	sendData.msg = 'success';
	// 	sendData.data = feedNames;
	// } else {
	// 	sendData.msg = "error";
	// }
	Model.listModel.find((err, data) => {
		console.log('sendData', data);
		sendData.status = 1;
		sendData.msg = 'success';
		sendData.data = data;
		let json = JSON.stringify(sendData);
		res.send(callback + '(' + json + ')');
	});

};

exports.test = (req, res, next) => {
	// 获取上级目录
	var dirPath = path.resolve(__dirname, '..');
	// console.log('req', path.resolve(__dirname, '../../'));
	// res.cookie('cart', {items: [312]});
	var pathUrl = req.path;
	console.log('pathUrl:', pathUrl);
  // if(pathUrl !== '/') {
		// 	res.download(path.join(dirPath, './public/images/like/like6.jpg'), 'like6.jpg', (err)=>{
		// 		if (err) {
		// 			console.log('123', err);
		// 		} else {
		// 			console.log('OKOK');
		// 		}
		// 	});
		// } else {
		// 	next();
		// }
	res.send(`<a href="./download.png">download</a>`);

	//  start
  /*var file = '/Users/smzdm/react/server/public/images/like/like6.jpg';

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);*/
  // end
};



