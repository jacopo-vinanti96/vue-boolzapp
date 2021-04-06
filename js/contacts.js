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
    chatMsgInput: '',
    contactActive: null,
    searchVal: '',
  },
  methods: {

    randomNum(min, max) {
      let random = Math.floor( Math.random() * (max - min + 1) ) + min;
        if ( random < 10 ) {
          random = '0' + random;
        }
      return random;
    },

    searchContact() {
      for ( const obj in this.contacts ) {
        let contact = this.contacts[obj];
        contact.visible = true;
        let char = 0;
        let cycle = true;
        if ( contact.name.length < this.searchVal.length ) {
          contact.visible = false;
          cycle = false;
        }
        while ( this.searchVal.length > 0 && char < contact.name.length && cycle == true ) {
          if ( contact.name[char].toLowerCase() == this.searchVal[0].toLowerCase() ) {
            if ( this.searchVal.length > 1 ) {
              let i = 1;
              while ( i < this.searchVal.length && cycle == true ) {
                if ( contact.name[char + i] == undefined || contact.name[char + i].toLowerCase() != this.searchVal[i].toLowerCase() ) {
                  contact.visible = false;
                  cycle = false;
                }
                i++
              }
            }
            cycle = false;
          } else if ( char + 1 == contact.name.length ) {
            contact.visible = false;
          }
          char++;
        }
      }
    },

    setActive(index) {
      this.contactActive = this.contacts[index];
    },

    sendMsg() {
      if ( this.chatMsgInput.length > 0 ) {
        this.contactActive.messages.push({
          date: dayjs().format('D/MM/YYYY HH:mm:ss'),
          message: this.chatMsgInput,
          status: 'sent'
        });
        this.chatMsgInput = '';
        this.receiveMsg();
      }
    },

    receiveMsg() {
      let tempContact = this.contactActive;
      setTimeout( () => {
        tempContact.accessDate = 'Sta scrivendo...';
        this.$forceUpdate();
      }, 2000);
      setTimeout( () => {
        let now = dayjs().format('D/MM/YYYY HH:mm:ss');
        let nowHH = dayjs().format('HH:mm');
        tempContact.accessDate = `Ultimo accesso oggi alle ${nowHH}`;
        tempContact.messages.push({
          date: now,
          message: 'Ok',
          status: 'received'
        });
      }, 4000);
    }
  },

  mounted() {
    let nowHH = parseInt( dayjs().format('HH') );
    let nowMM = parseInt( dayjs().format('mm') );
    for ( index in this.contacts ) {
      let randomHH = this.randomNum(0, nowHH);
      let randomMM;
      if ( parseInt( randomHH ) == nowHH ) {
        randomMM = this.randomNum(0, nowMM);
      } else {
        randomMM = this.randomNum(0, 60);
      }
      this.contacts[index].accessDate = `Ultimo accesso oggi alle ${randomHH}:${randomMM}`;
    }
  }
})
