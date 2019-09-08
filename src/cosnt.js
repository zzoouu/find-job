export const bossIcons = [
    {
        text: 'boy',
    },
    {
        text: 'bull'
    },
    {
        text: 'chick'
    },
    {
        text: 'crab'
    },
    {
        text: 'girl'
    },
    {
        text: 'hedgehog'
    },
    {
        text: 'hippopotamus'
    },
    {
        text: 'koala'
    },
    {
        text: 'lemur'
    },
    {
        text: 'man'
    },
    {
        text: 'pig'
    },
    {
        text: 'tiger'
    },
    {
        text: 'whale'
    },
    {
        text: 'woman'
    },
    {
        text: 'zebra'
    },
]
export const bossItem = [
    {
        key: 'title',
        label: '招聘职位'
    },
    {
        key: 'company',
        label: '公司名称'
    },
    {
        key: 'money',
        label: '职位薪资'
    }
]
export const geniusItem = [
    {
        key: 'title',
        label: '求职岗位'
    },
    {
        key: 'desc',
        label: '个人简介'
    }
]
export const navList = (user, Boss, Genius, Msg, User) => {
    return [
        {
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            compomnent: Boss,
            hide: user.type === 'genius'
        },
        {
            path: '/genius',
            text: 'boss',
            icon: 'job',
            title: 'BOSS列表',
            compomnent: Genius,
            hide: user.type === 'boss'
        },
        {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表',
            compomnent: Msg,
            // hide: user.type === 'boss'
        },
        {
            path: '/me',
            text: '我',
            icon: 'user',
            title: '个人中心',
            compomnent: User,
            // hide: user.type === 'boss'
        },
    ]
}
export const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 😚 😙 😋 😛 😜 😝 🤑 🤗 🤭 🤐 🤨 😑 😶 🙄 😴 😷 🤒 🤕 🤢 🤮 🤧 🥶 🥴 😵'