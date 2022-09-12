function scale(){
    var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
 document.body.style.msTransform =   scale;       // IE 9
 document.body.style.transform = scale; 
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
function reA(arr, value) {
    if (isNaN(value) || value > x["totalPost"]){
        value = randInt(1,x["totalPost"]);
    }
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return [value].concat(arr);
  }

var postArr=Array.from({length:x.totalPost},(_,a)=>a+1);
function postList() {
    arr = shuffle(postArr);
    postNum = parseInt(window.location.href.split("?")[1]);
    arr = reA(arr,postNum);
    window.postArr = arr;
}

postList();

function createPost() {

    const head = document.createElement("div");
    head.setAttribute("id", "header");
    head.innerHTML = '<h1 id="herohead">' + x["title"] + '</h1>';
    document.getElementById("app").appendChild(head);

    const main = document.createElement("div");
    main.setAttribute("id", "main");
    document.getElementById("app").appendChild(main);

    for (i = 1; i <= x["totalPost"]; i++) {
        j = postArr[i - 1];
        //console.log(j);
        const post = document.createElement("div");
        post.setAttribute("class", "mBlog");
        bgwidth = 750 + i;
        post.setAttribute("style", "background-image: url('https://source.unsplash.com/featured/400x" + bgwidth + "');");
        if (x["showAuth"]){
            post.innerHTML = `<div class="blogPost"><p class="blogText">` + x["posts"]["id" + j] + `<span id="auth"><br><br> - ` + x["author"] + `</span></p><div class="mBlogSidebar"><div class="mBlogSidebar__button"><span class="material-icons" onclick="count('` + j + `')"> favorite_border </span><p id="cval-` + j + `"></p></div><div class="mBlogSidebar__button"><span class="material-icons" onclick="share(`+j+`);"> share</div></div></div><div class="mBlogFooter"><div class="mBlogFooter__ticker"><span class="material-icons mBlogFooter__icon"> account_circle </span><marquee>Designed and Developed by Amlan Saha Kundu, 2022.</marquee></div><a href="https://github.com/yoursamlan" target="_blank"><img src="https://raw.githubusercontent.com/yoursamlan/projX/master/logoonly.png" alt="" class="mBlogFooter__record"/></a></div>`;
        } else {
            post.innerHTML = `<div class="blogPost"><p class="blogText">` + x["posts"]["id" + j] +`</p><div class="mBlogSidebar"><div class="mBlogSidebar__button"><span class="material-icons" onclick="count('` + j + `')"> favorite_border </span><p id="cval-` + j + `"></p></div><div class="mBlogSidebar__button"><span class="material-icons" onclick="share(`+j+`);"> share</div></div></div><div class="mBlogFooter"><div class="mBlogFooter__ticker"><span class="material-icons mBlogFooter__icon"> account_circle </span><marquee>Designed and Developed by Amlan Saha Kundu, 2022.</marquee></div><a href="https://github.com/yoursamlan" target="_blank"><img src="https://raw.githubusercontent.com/yoursamlan/projX/master/logoonly.png" alt="" class="mBlogFooter__record"/></a></div>`;
            const collection = document.getElementsByClassName("blogText");
            for (let i = 0; i < collection.length; i++) {
                collection[i].style.top = "35%";
              }
        }
        document.getElementById("main").appendChild(post);
    }

    document.title = x["title"];
}

function share(n) {
    var y = window.location.href.split("?")[0].replace("/index.html", "")+"?" + n;;
	try {
		navigator.clipboard.writeText(y);
		alert("✔️ Link is Copied ");
	} catch (err) {
		console.log("Share Failed", err.message);
	}
}

//=======================================================================================

api1 = x["apiKey"];
api2 = "ff6dd92678060380f6bd";
var counter = {};

function count(num) {
	var x = counter["c" + num];
	x = x + 1;
	document.getElementById("cval-" + num).textContent = x;
	counter["c" + num] = x;
	console.log(counter);
	push();
}

function push() {
	var x = JSON.stringify(counter);
	fetch("https://api.npoint.io/" + api1, {
		body: x,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	}).then((res) => {
		console.log("Request complete! response:", res);
		console.log("Push Successful");
	});
}

function pull() {
	let URL = "https://api.npoint.io/" + api1;
	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			let x = data;
			console.log(x);
			window.counter = x;
			var data = x;
			Object.keys(data).forEach(function (k) {
				var d = data[k];
				for (i = 1; i <= Object.keys(data).length; i++) {
					try {
						document.getElementById("cval-" + i).textContent = counter["c" + i];
					} catch (error) {
						console.log(error);
					}
				}
			});

			console.log("Pull Successful");
		})
		.catch((error) => console.error(error));
}

function init() {
    scale();
	pull();
	createPost();
}
