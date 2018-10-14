import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {
    constructor() {
        super()       
        this.adicionaTweet = this.adicionaTweet.bind(this)
    }

    componentWillMount() {
        this.setState({
            novoTweet: '',
            tweets: []
        });
    }

    componentDidMount() {
        console.log('componentDidMount');
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        .then(response => response.json())
        .then((tweets) => {
            console.log(tweets);
            this.setState({
                tweets
            })
        }) 
    }

    adicionaTweet(event) {
        event.preventDefault();
        const novoTweet = this.state.novoTweet
        const tweetAntigos = this.state.tweets
        if (novoTweet) {
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')
                }`, { 
                        method: 'POST', 
                        body: JSON.stringify({ conteudo: novoTweet }) 
                    }
            )
            .then(response => response.json())
            .then((novoTweetRegistradoNoServer) => {
                this.setState({
                    tweets: [ novoTweetRegistradoNoServer, ...tweetAntigos ],
                    novoTweet: ''
                })
            })
        }
    }
    
  render() {
    return (
      <Fragment>
        <Cabecalho>
            <NavMenu usuario="@helderaraujo" />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={ this.adicionaTweet } >
                        <div className="novoTweet__editorArea">
                            <span className={`novoTweet__status 
                                ${ this.state.novoTweet.length > 140 
                                    ? 'novoTweet__status--invalido':''}`}>
                                    { this.state.novoTweet.length }/140</span>
                            <textarea className="novoTweet__editor" 
                                value= { this.state.novoTweet }
                                onChange= {( event ) => this.setState({ novoTweet: event.target.value })}
                                placeholder="O que está acontecendo?"></textarea>
                        </div>
                        <button type="submit"
                                disabled = { this.state.novoTweet.length > 140 ? true : false} 
                                className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        { 
                             (this.state.tweets.length === 0) ?
                                <span> Crie um novo Tweet </span> : this.state.tweets.map((tweetInfo, index ) =>  <Tweet key={tweetInfo._id} texto={tweetInfo.conteudo.toString()} tweetInfo={tweetInfo} /> )  
                        } 
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
