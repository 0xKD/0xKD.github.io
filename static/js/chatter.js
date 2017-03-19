(function() {
  var vue = new Vue({
    el: '#app',
    data: function() {
      return {
        message: "hello, world!",
        inputText: "",
        messages: JSON.parse(localStorage.getItem("chatter.messages") || "[]")
      };
    },
    methods: {
      persist: function(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
      },
      onSubmitText: function() {
        if (this.inputText) {
          this.messages.unshift({
            text: this.inputText,
            sender: '~anonymous',
            created: new Date()
          });
        }
        this.inputText = "";
        this.persist("chatter.messages", this.messages);
      },
      clearMessages: function() {
        this.messages = [];
        this.persist("chatter.messages", this.messages);
      },
      getDate: function(dt) {
        var date = new Date(dt);
        return date.toLocaleTimeString();
      }
    }
  });
}());