import React, { Component } from 'react';
import './App.css';

let data = [
    {
        title: 'To Do',
        task: [
            {
                title: 'Bring Milk tomorrow',
                description: 'Bring milk tomorrow by 6 PM',
                primary_id: '1234',
                label: 'TO DO'
            },
            {
                title: 'Find Ebook',
                description: 'Find ebook for JS',
                primary_id: '1235',
                label: 'TO DO'
            },
            {
                title: 'Set room',
                description: 'set room properly',
                primary_id: '1236',
                label: 'TO DO'
            },
            {
                title: 'Bring chair',
                description: 'bring chair at room to sit',
                primary_id: '1237',
                label: 'TO DO'
            },
        ]
    },
    {
        title: 'In Progress',
        task: [
            {
                title: 'Search room',
                description: 'Search room for yourself',
                primary_id: '1238',
                label: 'IN PROGRESS'
            },
            {
                title: 'complete project',
                description: 'complete task management project',
                primary_id: '1239',
                label: 'IN PROGRESS'
            }
        ]
    },
    {
        title: 'Done',
        task: [
            {
                title: 'order water',
                description: 'order bisleri water',
                primary_id: '1240',
                label: 'DONE'
            }
        ]
    },
    {
        title: 'Closed',
        task: [
            {
                title: 'order phone',
                description: 'order nokia 6.1 plus',
                primary_id: '1241',
                label: 'CLOSED'
            },
            {
                title: 'order a pen drive',
                description: 'order a otg pen drive',
                primary_id: '1242',
                label: 'CLOSED'
            },
            {
                title: 'set up wifi',
                description: 'set up wifi',
                primary_id: '1243',
                label: 'CLOSED'
            }
        ]
    }
]

let column = ['TO DO', 'IN PROGRESS', 'DONE', 'CLOSED'];

let columnStyle = {
    padding: '4px 10px',
    border: '1px solid',
    margin: 5,
    borderRadius: 4,
    cursor: 'pointer',
    width: '25%',
    color: '#3a3131'
}

let columnStyle2 = {
    padding: '4px 10px',
    display: 'flex',
    flexDirection: 'column',
    margin: '5px',
    borderRadius: 4,
    width: '25%'
}

let taskStyle = {
    padding: 2,
    margin: '4px 0px',
    fontSize: 12,
    border: '1px solid #8a8787',
    borderRadius: 5,
    boxShadow: 'rgb(95, 89, 93) 1px 1px 2px',
    cursor: 'pointer',
    backgroundColor: 'rgb(240, 246, 249)',
    color: 'black'
}

let taskTitleStyle = {
    padding: '5px 0px 0px 5px',
    fontWeight: 'bold',
    textAlign: 'left'
}

let modalStyle = {
    position: 'absolute',
    top: '50%',
    borderRadius: 5,
    backgroundColor: 'white',
    border: '1px',
    boxShadow: '2px 2px 2px #524d4d',
    padding: 10,
    minWidth: '60%'
}

let clearStyle = {
    fontSize: 16,
    color: 'black',
    cursor: 'pointer',
    float: 'right'
}

let modalHeadingStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#4a4747'
}

let modalSubHeadingStyle = {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    color: '#4a4747'
}

let descriptionStyle = {
    margin: 5,
    textAlign: 'left'
}

class App extends Component {
  
    state = {
        someData: data.slice(),
        menuList: column.slice(),
        modalContent: {},
        dialogOpen: false
    }
    
    setStatus = (selection) => {
        let elem = document.getElementById('task_status');
        if(selection.label === column[3]){
            elem.selectedIndex = 3;
        } else {
            elem.selectedIndex = column.findIndex(item => item === selection.label);
        } 
    }
    
    openDialog = (selection) => {
        this.setState({ dialogOpen: true, modalContent: selection })
        this.setStatus(selection);
    }
    
    closeModal = () => {
        this.setState({ dialogOpen: false })
    }
  
    selectStatus = (selection, e) => {
        let { someData, menuList } = this.state;
        let value = e.target.value;
        let selectedIndex = 0;
        if(selection.label !== value && selection.label !== column[3]) {
            
            let indexToUse = column.findIndex(item => item === selection.label);
            selectedIndex = someData[indexToUse].task.findIndex(item => item.primary_id === selection.primary_id);
            if(selectedIndex >= 0) {
                someData[indexToUse].task.splice(selectedIndex, 1);
            }
            
            let indexToPutIn = column.findIndex(item => item === value);
            if(indexToPutIn >= 0) {
                selection.label = value;
                someData[indexToPutIn].task.push(selection);
            }
            
            // NOTE: For Reference
            /* 
            let selectedMenuIndex = column.findIndex(item => item === selection.label);
            
            if(selectedMenuIndex >= 0) {
                console.log('selectedMenuIndex', selectedMenuIndex);
                menuList = [];
                column.map(item => {
                    if(item !== selection.label) {
                        console.log('item', item, 'selection.label', selection.label);
                        menuList.push(item);
                    }
                    return false;
                })
                // menuList.unshift(menuList.splice(selectedMenuIndex, 1).join(','));  //nice one
                menuList.unshift(selection.label);
                console.log('menuList', menuList);
            }
            */
        }
        
        this.setStatus(selection);
        this.setState({ someData, menuList })
    }
  
    render () {
        
        let { someData, dialogOpen, modalContent, menuList } = this.state;
        
        return (
          <div className="App">
            <header className="App-header">
                <div
                  style={{
                      padding: 10,
                      fontSize: 24,
                      color: 'black'
                  }}
                >
                    Tasker
                </div>
                
                <div>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            marginTop: 10
                        }}
                    >
                        <div style={columnStyle}> {someData[0].title} </div>
                        <div style={columnStyle}> {someData[1].title} </div>
                        <div style={columnStyle}> {someData[2].title} </div>
                        <div style={columnStyle}> {someData[3].title} </div>
                    </div>
                    
                    <div> 
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                marginTop: 10
                            }}
                        >
                            <div style={columnStyle2}>
                                {
                                    someData[0].task.map((item, idx) => {
                                        return (
                                            <div 
                                                key={idx} 
                                                style={
                                                    taskStyle
                                                }
                                                onClick={this.openDialog.bind(this, item)}
                                            >
                                                <div
                                                    style={
                                                        taskTitleStyle
                                                    }
                                                >
                                                    {item.title}
                                                </div>
                                                
                                                <div
                                                    style={descriptionStyle}
                                                >
                                                    {item.description}
                                                </div>
                                                 
                                            </div> 
                                        )
                                    })
                                }
                            </div>
                            
                            <div style={columnStyle2}>
                                {
                                    someData[1].task.map((item, idx) => {
                                        return (
                                            <div 
                                                key={idx} 
                                                style={
                                                    taskStyle
                                                }
                                                onClick={this.openDialog.bind(this, item)}
                                            >
                                                <div
                                                    style={
                                                        taskTitleStyle
                                                    }
                                                >
                                                    {item.title}
                                                </div>
                                                
                                                <div
                                                    style={descriptionStyle}
                                                >
                                                    {item.description}
                                                </div>
                                            </div> 
                                        )
                                    })
                                }
                            </div>
                            
                            <div style={columnStyle2}>
                                {
                                    someData[2].task.map((item, idx) => {
                                        return (
                                            <div 
                                                key={idx} 
                                                style={
                                                    taskStyle
                                                }
                                                onClick={this.openDialog.bind(this, item)}
                                            >
                                                <div
                                                    style={
                                                        taskTitleStyle
                                                    }
                                                >
                                                    {item.title}
                                                </div>
                                                
                                                <div
                                                    style={descriptionStyle}
                                                >
                                                    {item.description}
                                                </div>
                                            </div> 
                                        )
                                    })
                                }
                            </div>
                            
                            <div style={columnStyle2}>
                                {
                                    someData[3].task.map((item, idx) => {
                                        return (
                                            <div 
                                                key={idx} 
                                                style={
                                                    taskStyle
                                                }
                                                onClick={this.openDialog.bind(this, item)}
                                            >
                                                <div
                                                    style={
                                                        taskTitleStyle
                                                    }
                                                >
                                                    {item.title}
                                                </div>
                                                
                                                <div
                                                    style={descriptionStyle}
                                                >
                                                    {item.description}
                                                </div>
                                            </div> 
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <dialog
                    open={dialogOpen}
                    style={modalStyle}
                >
                    <div style={{ padding: 2 }}> <em onClick={this.closeModal} style={clearStyle}> x </em> </div>
                    <div
                        style={{color: 'black'}}
                    >
                        Task Action
                    </div>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            padding: 10
                            
                        }}
                    >
                        <div
                            style={{
                                width: '70%'
                            }}
                        >
                            <div
                                style={modalHeadingStyle}
                            >
                                {modalContent.title}
                            </div>
                            <div
                                style={modalSubHeadingStyle}
                            >
                                <div
                                    style={{...modalSubHeadingStyle, fontWeight: 'bold'}}
                                >
                                    Description
                                </div>
                                <div
                                    style={modalSubHeadingStyle}
                                >
                                    {modalContent.description}
                                </div>
                                
                            </div>
                        </div>
                        
                        <div
                            style={{
                                width: '30%'
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: 14
                                    }}
                                >
                                    Status
                                </div>
                                <div>
                                <select
                                    id="task_status"
                                    onChange={this.selectStatus.bind(this, modalContent)}
                                >
                                
                                  { menuList.map((item, idx) => {
                                      return <option key={idx} value={item}> {item} </option>
                                  } )}
                                  
                                </select>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </dialog>
                
            </header>
          </div>
        );
    }
}

export default App;
