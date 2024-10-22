// src/utils.js

import fecha from 'fecha';

export const formatDate = function(date, format = 'yyyy-MM-dd HH:mm:ss') {
    // 确保传入的日期是 Date 对象
    date = new Date(date);
    if (isNaN(date)) return ''; // 如果日期无效则返回空字符串

    return fecha.format(date, format);
};
