export class SampleData {
    static taskData = {
        items: [
            {
                name: '工程概况牌',
                descr: '因各地政府要求不同，样式稍有不同',
                is_gps: 0,
                photo_amount: 1,
                bonus: {
                    rmb: {yuan: 10, credit: 2},
                    dhb: {yuan: 10, credit: 4},
                }
            },
            {
                name: '现场管理人员及联系方式公示牌',
                descr: '',
                is_gps: 0,
                photo_amount: 1,
                bonus: {
                    rmb: {yuan: 20, credit: 2},
                    dhb: {yuan: 20, credit: 3},
                }
            },
            {
                name: '施工现场环境保护公示牌',
                descr: '又名扬尘处理、垃圾处理、噪音处理、污水处理公示牌等',
                is_gps: 0,
                photo_amount: 1,
                bonus: {
                    rmb: {yuan: 20, credit: 1},
                    dhb: {yuan: 20, credit: 3},
                }
            },
            {
                name: '项目通讯录照片',
                descr: '',
                is_gps: 0,
                photo_amount: 1,
                bonus: {
                    rmb: {yuan: 40, credit: 3},
                    dhb: {yuan: 40, credit: 6},
                }
            },
            {
                name: '施工现场照片',
                descr: '3-10张，图片需能反馈项目进度，至少有一张需拍到项目名称',
                is_gps: 0,
                photo_amount: 3,
                bonus: {
                    rmb: {yuan: 5, credit: 1},
                    dhb: {yuan: 5, credit: 2},
                }
            },
            {
                name: '上传项目现场地理位置',
                descr: '',
                is_gps: 1,
                bonus: {
                    rmb: {yuan: 5, credit: 1},
                    dhb: {yuan: 5, credit: 2},
                }
            },
        ],
        bonus: {
            rmb: {yuan: 100, credit: 10},
            dhb: {yuan: 100, credit: 20}
        }
    };

    static pickables = [
        {
            photo: 'gd1.png',
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            distance: '12.3km',
            bonus: '100'
        },
        {
            photo: 'gd2.png',
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            distance: '12.3km',
            bonus: '100'
        },
        {
            photo: 'gd3.png',
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            distance: '12.3km',
            bonus: '100'
        },
    ];

    static myTasks = {
        doing: [
            {
                photo: 'gd1.png',
                title: '项目现场拍照',
                desc: '新型混炼胶生产项目',
                distance: '12.3km',
                time_expired: '2019-05-17 19:27:00',
                state: 1,
                expired: 0
            },
            {
                photo: 'gd2.png',
                title: '项目现场拍照',
                desc: '新型混炼胶生产项目',
                address: '河北省保定市莲池区未来像素广场A座',
                state: 2,
                expired: 0
            },
            {
                photo: 'gd3.png',
                title: '项目现场拍照',
                desc: '新型混炼胶生产项目',
                time_expired: '2019-05-17 19:27:00',
                address: '河北省保定市莲池区未来像素广场A座',
                state: 3,
                expired: 0
            }],
        done: [
            {
                photo: 'gd1.png',
                title: '项目现场拍照',
                desc: '新型混炼胶生产项目',
                address: '河北省保定市莲池区未来像素广场A座',
                bonus: {
                    type: '人民币',
                    yuan: 50,
                    credit: 5,
                },
                state: 9,
                expired: 0,
                bonusTime: '2019-02-01'
            },
            {
                photo: 'gd2.png',
                title: '项目现场拍照',
                desc: '新型混炼胶生产项目',
                address: '河北省保定市莲池区未来像素广场A座',
                state: 9,
                expired: 0,
                bonusTime: null
            },
            {
                photo: 'gd2.png',
                title: '项目现场拍照',
                desc: '新型混炼胶生产项目',
                address: '河北省保定市莲池区未来像素广场A座',
                state: 3,
                expired: 1
            },
            {
                photo: 'gd2.png',
                title: '项目现场拍照',
                desc: '新型混炼胶生产项目',
                address: '河北省保定市莲池区未来像素广场A座',
                state: 1,
                expired: 1
            }
        ],
    };

    static bonusCredit = [
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 5,
            bonusTime: '2019-02-01 14:00:23'
        },
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 5,
            bonusTime: '2019-02-01 14:00:23'
        },
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 5,
            bonusTime: '2019-02-01 14:00:23'
        },
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 5,
            bonusTime: '2019-02-01 14:00:23'
        },
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 5,
            bonusTime: '2019-02-01 14:00:23'
        },
    ];

    static bonusRmb = [
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 100,
            bonusTime: '2019-02-01 14:00:23'
        },
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 100,
            bonusTime: '2019-02-01 14:00:23'
        },
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 60,
            bonusTime: '2019-02-01 14:00:23'
        },
    ];

    static bonusDhb = [
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 100,
            bonusTime: '2019-02-01 14:00:23'
        },
        {
            title: '项目现场拍照',
            desc: '新型混炼胶生产项目',
            amount: 100,
            bonusTime: '2019-02-01 14:00:23'
        },
    ];

    static bonusOutRmb = [
        {
            title: '微信提现',
            desc: 'yonghuming',
            amount: 100,
            time: '2019-03-01 23:22:23'
        }, {
            title: '银行卡提现',
            desc: '建设银行(470033119993112)',
            amount: 100,
            time: '2019-03-01 23:22:23'
        }
    ];

    static messages = {
        types: ['系统消息', '任务消息', '奖励消息'],
        items: [
            {
                type: 1,
                read: 0,
                message: '您的拍照任务(新建混炼胶项目)未通过审核',
                time: '2019-03-01 23:22:23'
            },
            {
                type: 2,
                read: 0,
                message: '您领取的拍照任务审核已通过,快来领取奖励吧',
                time: '2019-03-01 23:22:23'
            },
            {
                type: 2,
                read: 0,
                message: '您领取的拍照任务审核已通过,快来领取奖励吧',
                time: '2019-03-01 23:22:23'
            },
            {
                type: 1,
                read: 0,
                message: '您的拍照任务(新建混炼胶项目)未通过审核',
                time: '2019-03-01 23:22:23'
            },
            {
                type: 2,
                read: 0,
                message: '您领取的拍照任务审核已通过,快来领取奖励吧',
                time: '2019-03-01 23:22:23'
            },
            {
                type: 1,
                read: 1,
                message: '您的拍照任务(新建混炼胶项目)未通过审核',
                time: '2019-03-01 23:22:23'
            },
        ]
    };
}
