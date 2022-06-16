const app = new Vue({
    el: '#app',
    data: {
        active: null,
        newMessage: '',
        search: null,
        selected: null,
        contacts: [
            {
                name: "Michele",
                avatar: "_1",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "15:30",
                        text: "Hai portato a spasso il cane?",
                        status: "sent",
                    },
                    {
                        date: "15:50",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent",
                    },
                    {
                        date: "16:15",
                        text: "Tutto fatto!",
                        status: "received",
                    },
                ],
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "16:30",
                        text: "Ciao come stai?",
                        status: "sent",
                    },
                    {
                        date: "16:30",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received",
                    },
                    {
                        date: "16:35",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent",
                    },
                ],
            },
        
            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "10:10",
                        text: "La Marianna va in campagna",
                        status: "received",
                    },
                    {
                        date: "10:20",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent",
                    },
                    {
                        date: "16:15",
                        text: "Ah scusa!",
                        status: "received",
                    },
                ],
            },
            {
                name: "Alessandro.B",
                avatar: "_4",
                visible: true,
                lastAccess: null,
                messages: [
                    {
                        date: "15:30",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent",
                    },
                    {
                        date: "15:50",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                    },
                ],
            },
            {
                name: "Alessando.L",
                avatar: "_5",
                visible: false,
                lastAccess: null,
                messages: [],
            },
            {
                name: "Claudia",
                avatar: "_6",
                visible: false,
                lastAccess: null,
                messages: [],
            },
            {
                name: "Federico",
                avatar: "_7",
                visible: false,
                lastAccess: null,
                messages: [],
            },
            {
                name: "Davide",
                avatar: "_8",
                visible: false,
                lastAccess: null,
                messages: [],
            },
        ],
        answers: [
            'Per quanto posso vedere, sì',
            'È certo',
            'È decisamente così',
            'Molto probabilmente',
            'Le prospettive sono buone',
            'I segni indicano di sì',
            'Senza alcun dubbio',
            'Sì',
            'sì, senza dubbio',
            'Ci puoi contare',
            'Non ci contare',
            'La mia risposta è no',
            'Le mie fonti dicono di no',
            'Le prospettive non sono buone',
            'Molto incerto'
        ],
        messageSent: false,
        menuClick: false,
        messageActive: {
            menuShow: null,
            messageIndex: null
        },
        chatMenuClick: false,
        loaded : false,
        darkmode: false,
    },
    created() {
        this.search = '';
        this.selected = 'f-medium',
        this.getLastAccessData();

        setTimeout(() => {
            this.loaded = true;
        }, 1000);
    },
    methods: {
        getLastMessageorDate: function(contact, message) {
            if (this.contacts[contact].messages.length > 0) {
                const messages = this.contacts[contact].messages; 
                const messagesLength = messages.length - 1;
                if (message == 'text') {
                    const lastMessage = messages[messagesLength].text;
                    return lastMessage;
                } else if (message == 'data') {
                    const lastData = messages[messagesLength].date;
                    return lastData;
                }
            } else {
                return '';
            }
        },

        sendNewMessage: function(message, active) {
            this.newMessage = '';
            if (message.trim() !== '') {
                const newMessage = 
                {
                    date: '',
                    text: '',
                    status: "sent",
                }
                let now = dayjs();
                const data = `${now.format('HH')}:${now.format('mm')}`
                newMessage.date = data;
                newMessage.text = message;
                this.contacts[active].messages.push(newMessage);
                if (!this.messageSent) {
                    setTimeout(() => {
                        this.contacts[active].lastAccess = 'online'
                        setTimeout(() => {
                            this.contacts[active].lastAccess = 'sta digitando..'
                            setTimeout(() => {
                                this.receiveNewMessage(active);
                            }, 1000);
                        }, 2000);
                    }, 2000);
                    this.messageSent = true;
                }

            }
        },

        receiveNewMessage: function(active) {
            const newMessage =
            {
                date: '',
                text: '',
                status: "received",
            }
            let now = dayjs();
            const data = `${now.format('HH')}:${now.format('mm')}`;
            newMessage.date = data;
            newMessage.text = this.getRandomAnswer(this.answers);
            this.contacts[active].messages.push(newMessage);
            
            this.contacts[active].lastAccess = 'online';
            
            setTimeout(() => {
                const now = dayjs();
                this.contacts[active].lastAccess = `Ultimo accesso oggi alle ${now.format('HH')}:${now.format('mm')}`;
                this.messageSent = false;
            }, 3000);
        },

        showContact: function(contact) {
            return (contact.name.toLowerCase().includes(this.search.toLowerCase()));
        },

        getLastAccessData: function() {
            for (let i = 0; i < this.contacts.length; i++) {
                const contact = this.contacts[i];
                const messages = contact.messages;
                messages.forEach(message => {
                    if (message.status == 'received') {
                        this.contacts[i].lastAccess = `Ultimo accesso: ${message.date}`;
                    }
                });
                
            }
        },

        getRandomAnswer: function(array) {
            const min = 0;
            const max = array.length - 1;
            const randomIndex = Math.floor(Math.random() * (max - min) + min);

            return array[randomIndex];
        },

        deleteMessages: function(active) {
            this.menuClick = false;
            this.contacts[active].messages = [];
            
        },

        deleteMessage: function(index) {
            this.contacts[this.active].messages.splice(index, 1);
        },

        deleteChat: function() {
            this.menuClick = false;
            this.contacts[this.active].visible = false;
            this.active = 0;
            while (!this.contacts[this.active].visible) {
                this.active++;
            }

        },

        activeNewChat: function(index) {
            this.active = index;
            this.contacts[index].visible = true;
            this.search = '';
        },

        showChatMenu: function(index) {
            if (this.messageActive.menuShow) {
                if (this.messageActive.messageIndex != index) {
                    this.messageActive.messageIndex = index;
                } else {
                    this.messageActive.menuShow = !this.messageActive.menuShow;
                }
            } else {
                this.messageActive.menuShow = !this.messageActive.menuShow;
                this.messageActive.messageIndex = index;
            }
            
            


        }  

    }
});