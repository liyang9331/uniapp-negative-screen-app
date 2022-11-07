// 生成随机秘钥
export function randomString (e){
	e = e || 6;
	var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
		a = t.length,
		n = "";
	for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n
};
