import * as React from 'react'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {MeetupService} from '../lib/MeetupService'
import {Loading} from './Loading'
import {BgImage} from './BgImage'

export class MeetupsList extends Component {
  constructor(props) {
    super(props)

    this.state = {meetups: null}
    this.loadData()
  }

  async loadData() {
    this.setState({
      meetups: await MeetupService.findAll(),
    })
  }

  render() {
    return (
      <TransitionGroup>
        {!this.state.meetups && (
          <CSSTransition key="loading" classNames="fade-in" timeout={300} appear={true}>
            <Loading/>
          </CSSTransition>
        )}

        {this.state.meetups && (
          <CSSTransition key="meetups-list" classNames="fade-in" timeout={300} appear={true}>
            <div className="meetups-list">
              <div className="container-fluid">
                <h2 className="section-title">Наши события</h2>

                <div className="row">
                  {this.state.meetups && this.state.meetups.map(meetup => {
                    let image = meetup.photos[0]

                    return (
                      <div className="col-12 col-sm-6 col-md-4" key={meetup.id}>
                        <Link to={`/meetups/${meetup.id}`} className="meetups-list-item">
                          <div className="image-container">
                            <BgImage src={image.link}/>
                          </div>
                          <div className="info">
                            <div className="title">{meetup.title}</div>
                            <div className="date">{meetup.date}</div>
                          </div>
                          <div className="more-details">Подробнее</div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CSSTransition>
        )}

      </TransitionGroup>
    )
  }
}
