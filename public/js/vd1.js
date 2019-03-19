var list;

class Note extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false
    }
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  delete() {
    $.post(`/delete`, {idDelete: this.props.id}, (data) => {
      list.setState({
        arr: data
      });
    })
  }
  edit() {
    this.setState({
      onEdit: true
    });
  }
  save() {
    $.post(`/update`, {idEdit: this.props.id, contentEdit: this.refs.txt.value}, (data) => {
      list.setState({
        arr: data
      });
      this.setState({
        onEdit: false
      })
    })
  }
  cancel() {
    this.setState({
      onEdit: false
    });
  }
  render() {
    if (this.state.onEdit) {
      return (
        <div className="div-note"> 
          <input defaultValue={this.props.children} ref="txt"/>
          <input class="btn btn-primary" type="submit" value="Save" onClick={this.save} />
          <button type="button" class="btn btn-warning" onClick={this.cancel}>Cancel</button>Z
        </div>
      );
    }
    else {
      return (
        <div className="div-note"> 
          <p> {this.props.children} </p>
          <button className="btn btn-info" onClick={this.edit}>Edit</button>
          <button className="btn btn-danger" onClick={this.delete}>Delete</button>
        </div>
      );
    }
  }
}

function addDiv(){
  ReactDOM.render(
    <InputDiv />
    , document.getElementById(`div-add`)
  );
}

class List extends React.Component {
  constructor(props) {
    super(props);
    list = this;
    this.state = {
      arr: []
    }
  }
  render() {
    return (
      <div className="div-list">
        <h1 className="p-3 mb-2 text-white text-center h1">TO-DO LIST</h1>
        {
          this.state.arr.map((note, index) => {
            return <Note key={index} id={index}>{note}</Note>
          })
        }
        <div id="div-add"></div>
        <div className="div-add">
          <button type="button" className="btn btn-success" onClick={addDiv}><i className="fas fa-plus-circle"></i> Add </button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    $.post(`/getNotes`, (data) => {
      this.setState({
        arr: data
      });
    });
  }
}

class InputDiv extends React.Component {
  constructor (props) {
    super(props);
    this.send = this.send.bind(this);
  }
  send() {
    $.post(`/add`, {note: this.refs.txt.value}, (data) =>{
      list.setState({
        arr: data
      });
    })
    ReactDOM.unmountComponentAtNode(document.getElementById(`div-add`));
  }
  render() {
    return (
      <div className="div-input">
        <input type="text" ref="txt" placeholder="Enter your note!"/>
        <input class="btn btn-primary" type="submit" onClick={this.send} value="Submit"></input>
      </div>
    );
  }
}

ReactDOM.render(
  <div className="div-background">
      <List />
  </div>
  ,document.getElementById(`root`)
);