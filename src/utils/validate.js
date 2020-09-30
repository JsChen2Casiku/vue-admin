
//过滤特殊字符
export function stripscript(s) {
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]");
    let rs = "";
    for(let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

//验证邮箱：var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
export function verifyEmail(val) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(val) ? true : false;
}

/**
 * 验证密码
 * 字母+数字，6-12数字
 */
export function verifyPassword(val) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(val) ? true : false;
}

//字母 或 数字：left reg = /^[a-z0-9]{6}$/
/**
 * 验证验证码
 * 字母+数字，6数字
 */
export function verifyCode(val) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(val) ? true : false;
}


