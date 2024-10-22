// globalMixin.js
import { formatDate } from '@/utils';

export const globalMixin = {
    methods: {
        formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
            return formatDate(date, format);
        }
    }
};
