import React, { Component } from 'react';
import './Tweet.css';
import Like from '../like.svg';
import api from '../services/api';

export default class Tweet extends Component {

    handleLike = async () => {
        const { _id } = this.props.tweet;
        const token = JSON.parse(localStorage.getItem('@GoTwitter:account')).token;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await api.post(`likes/${_id}`);
    };

    render() {
        const { tweet } = this.props;
    return (
        <li className="tweet">
            <strong>{tweet.author}</strong>
            <p>{tweet.content}</p>
            <button type="button" onClick={this.handleLike}>
                <img src={Like} alt="Like" />
                {tweet.likes}
            </button>
        </li>
    )
    };
}
