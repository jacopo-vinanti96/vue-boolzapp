const app = new Vue({
  el: '#main-app',
  data: {
    contacts: [
        {
            name: 'Michele',
            avatar: '_1',
            visible: true,
            messages: [{
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            messages: [{
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            messages: [{
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Luisa',
            avatar: '_4',
            visible: true,
            messages: [{
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ],
        },
    ],
    activeIndex: null,
    chatMsgInput: '',
    contactActive: null,
  },
  methods: {
    setActive(index) {
      let contactBoxes = document.getElementsByClassName('contact-box');
      if ( contactBoxes[index].classList.contains('active') == false ) {
        if ( this.contactActive != null ) {
          document.getElementsByClassName('active')[0].classList.remove('active');
        }
        contactBoxes[index].classList.add('active');
      }
      this.contactActive = this.contacts[index];
      this.activeIndex = index;
    },
    sendMsg() {
      this.contactActive.messages.push({
        date: dayjs().format('D/MM/YYYY HH:mm:ss'),
        message: this.chatMsgInput,
        status: 'sent'
      });
      this.chatMsgInput = '';
      this.receiveMsg();
    },
    receiveMsg() {
      setTimeout( () => {
        this.contacts[this.activeIndex].accessDate = 'Sta scrivendo...';
        this.$forceUpdate();
      }, 2000);
      setTimeout( () => {
        let now = dayjs().format('D/MM/YYYY HH:mm:ss');
        let nowHH = dayjs().format('HH:mm:ss');
        this.contacts[this.activeIndex].accessDate = `Ultimo accesso oggi alle ${nowHH}`;
        this.contactActive.messages.push({
          date: now,
          message: 'Ok',
          status: 'received'
        });
      }, 4000);
    }
  },
  mounted() {
    for ( index in this.contacts ) {
      this.contacts[index].accessDate = 'offline';
    }
  }
})
