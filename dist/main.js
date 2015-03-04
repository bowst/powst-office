var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {selected: emails[0].id};
  },
  setSelected: function(id){
    this.setState({
      selected: id
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "app"}, 
        React.createElement("div", {className: "ui grid"}, 
          React.createElement("div", {className: "column row equal height"}, 
            React.createElement("div", {className: "two wide column"}, 
              React.createElement("img", {className: "logo", src: "app/img/logo.png"})
            ), 
            React.createElement("div", {className: "fourteen wide column"}, 
              React.createElement("h2", null, 
                "Powst Office"
              )
            )
          )
        ), 
        React.createElement("div", {className: "inbox"}, 
          React.createElement(Inbox, {setSelected: this.setSelected, selected: this.state.selected})
        ), 
        React.createElement(EmailBody, {email: _.findWhere(emails, {id: this.state.selected})}), 
        React.createElement("div", {className: "footer"}, 
          "Made with <3 by ", React.createElement("a", {href: "http://bowst.com"}, "Bowst"), "."
        )
      )
    );
  }
});

var Inbox = React.createClass({displayName: "Inbox",
  getInitialState: function(){
    return{
      sortBy: "Timestamp",
      ascending: true,
      emails: emails
    }
  },
  setSort: function(sortBy){
    //now do logic and set state
    var ascending = sortBy == this.state.sortBy ? !this.state.ascending : this.state.ascending;
    var sortedEmails = [];
    if(sortBy == "Timestamp"){
      sortedEmails = _.sortBy(emails, function(email){
        var stamp = moment.utc(email.sent);
        return ascending ? stamp : stamp * -1;
      });
    }else{
      sortedEmails = _.sortByAll(emails, [sortBy]);
      if(!ascending){
        sortedEmails = _(sortedEmails).reverse().value();
      }
    }
    this.setState({
      sortBy: sortBy,
      ascending: ascending,
      emails: sortedEmails
    });
  },
  render: function(){
    //set up the email rows
    var emailRows = this.state.emails.map(function(email){
      return (
        React.createElement(Row, {
          email: email, 
          isSelected: this.props.selected == email.id, 
          setSelected: this.props.setSelected, 
          key: email.id})
      );
    }, this);
    //now create the component
    var sortIcon = this.state.ascending ? (React.createElement("i", {className: "sort ascending icon"})) : (React.createElement("i", {className: "sort descending icon"}));
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "ui selection celled list top"}, 
          React.createElement("div", {className: "ui grid item"}, 
            React.createElement("div", {className: "four wide column", onClick: this.setSort.bind(null, "Timestamp")}, 
              React.createElement("div", {className: "header"}, "Timestamp ", this.state.sortBy == "Timestamp" ? sortIcon : "")
            ), 
            React.createElement("div", {className: "four wide column", onClick: this.setSort.bind(null, "to")}, 
              React.createElement("div", {className: "header"}, "To ", this.state.sortBy == "to" ? sortIcon : "")
            ), 
            React.createElement("div", {className: "eight wide column", onClick: this.setSort.bind(null, "subject")}, 
              React.createElement("div", {className: "header"}, "Subject ", this.state.sortBy == "subject" ? sortIcon : "")
            )
          )
        
        ), 
        React.createElement("div", {className: "ui selection celled list bottom"}, 
          emailRows
        )
      )
    );
  }
});

var Row = React.createClass({displayName: "Row",
  render: function(){
    //timestamp display logic
    var isToday = moment(this.props.email.sent).isSame(new Date(), "day");
    var timeStamp = moment(this.props.email.sent);
    var display = isToday ? timeStamp.format("h:mm:ss a") : timeStamp.format("M/D/YYYY h:mm:ss a");
    //set classes
    var cx = React.addons.classSet;
    var classes = cx({
      'active': this.props.isSelected,
      'item': true,
      'ui': true,
      'grid':true
    });
    return (
      React.createElement("div", {className: classes, onClick: this.props.setSelected.bind(null, this.props.email.id)}, 
        React.createElement("div", {className: "four wide column"}, 
          display
        ), 
        React.createElement("div", {className: "four wide column"}, 
          this.props.email.to_email
        ), 
        React.createElement("div", {className: "eight wide column"}, 
          this.props.email.subject
        )
      )
    );
  }
})

var EmailBody = React.createClass({displayName: "EmailBody",
  render: function(){
    return (
      React.createElement("div", {className: "ui segments"}, 
        React.createElement("div", {className: "ui segment"}, 
          React.createElement("p", null, React.createElement("strong", null, "Subject: ", this.props.email.subject))
        ), 
        React.createElement("div", {className: "ui segment"}, 
          React.createElement("p", null, React.createElement("strong", null, "HTML"))
        ), 
        React.createElement("div", {className: "ui secondary segment"}, 
          React.createElement("p", {dangerouslySetInnerHTML: {__html: this.props.email.body}})
        ), 
        React.createElement("div", {className: "ui segment"}, 
          React.createElement("p", null, React.createElement("strong", null, "Plaintext"))
        ), 
        React.createElement("div", {className: "ui secondary segment"}, 
          React.createElement("p", null, this.props.email.body)
        )
      )
    );
  }
})

React.render(
  React.createElement(App, null),
  document.getElementById('app')
);

