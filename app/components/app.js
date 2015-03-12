var App = React.createClass({
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
      <div className="app">
        <div className="ui grid">
          <div className="column row equal height">
            <div className="two wide column">
              <img className="logo" src="img/logo.png" /> 
            </div>
            <div className="fourteen wide column">
              <h2>
                Powst Office
              </h2>
            </div>
          </div>
        </div>
        <div className="inbox">
          <Inbox setSelected={this.setSelected} selected={this.state.selected} />
        </div>
        <EmailBody email={_.findWhere(emails, {id: this.state.selected})}/>
        <div className="footer">
          Made with &lt;3 by <a href="http://bowst.com">Bowst</a>.
        </div>
      </div>
    );
  }
});

var Inbox = React.createClass({
  getInitialState: function(){
    return{
      sortBy: "Timestamp",
      ascending: false,
      emails: emails
    }
  },
  setSort: function(sortBy){
    //now do logic and set state
    var ascending = (sortBy == this.state.sortBy ? !this.state.ascending : true);
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
        <Row 
          email={email} 
          isSelected={this.props.selected == email.id}
          setSelected={this.props.setSelected} 
          key={email.id} />
      );
    }, this);
    //now create the component
    var sortIcon = this.state.ascending ? (<i className="caret up icon"></i>) : (<i className="caret down icon"></i>);
    return (
      <div>
        <div className="ui selection celled list top">
          <div className="ui grid item">
            <div className="four wide column" onClick={this.setSort.bind(null, "Timestamp")}>
              <div className="header">Timestamp {this.state.sortBy == "Timestamp" ? sortIcon : ""}</div>
            </div>
            <div className="five wide column" onClick={this.setSort.bind(null, "to_email")}>
              <div className="header">To {this.state.sortBy == "to_email" ? sortIcon : ""}</div>
            </div>
            <div className="seven wide column" onClick={this.setSort.bind(null, "subject")}>
              <div className="header">Subject {this.state.sortBy == "subject" ? sortIcon : ""}</div>
            </div>
          </div>
        
        </div>
        <div className="ui selection celled list bottom">
          {emailRows}
        </div>
      </div>
    );
  }
});

var Row = React.createClass({
  render: function(){
    //timestamp display logic
    var isToday = moment(this.props.email.sent).isSame(new Date(), "day");
    var timeStamp = moment(this.props.email.sent);
    var display = isToday ? timeStamp.format("h:mm a") : timeStamp.format("M/D/YYYY h:mm a");
    //set classes
    var cx = React.addons.classSet;
    var classes = cx({
      'active': this.props.isSelected,
      'item': true,
      'ui': true,
      'grid':true
    });
    return (
      <div className={classes} onClick={this.props.setSelected.bind(null, this.props.email.id)}>
        <div className="four wide column">
          {display}
        </div>
        <div className="five wide column">
          {this.props.email.to_email}
        </div>
        <div className="seven wide column">
          {this.props.email.subject}
        </div>
      </div>
    );
  }
})

var EmailBody = React.createClass({
  render: function(){
    return (
      <div className="ui segments">
        <div className="ui segment">
          <p><strong>Subject: {this.props.email.subject}</strong></p>
        </div>
        <div className="ui segment">
          <p><strong>HTML</strong></p>
        </div>
        <div className="ui secondary segment">
          <p dangerouslySetInnerHTML={{__html: this.props.email.body}}></p>
        </div>
        <div className="ui segment">
          <p><strong>Plaintext</strong></p>
        </div>
        <div className="ui secondary segment">
          <p>{this.props.email.body}</p>
        </div>
      </div>
    );
  }
})

React.render(
  <App />,
  document.getElementById('app')
);

