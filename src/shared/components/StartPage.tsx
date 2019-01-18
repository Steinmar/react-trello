import * as React from 'react';
import { css } from 'aphrodite';
import { ROUTES } from 'src/core/Routes';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import pageStyles from 'src/styles/page';
import { connect } from 'react-redux';
import InfoMessage from './InfoMessage';
import Timer from './Timer';

const styles = pageStyles;

// TODO made models for this
class StartPage extends React.Component<any, any> {
  constructor(props) {
    const timeToShowLogoutMessage = 3000;
    super(props);

    const timerRef = setTimeout(() => {
      this.setState({ showLogoutMessage: false });
    }, timeToShowLogoutMessage);

    this.state = {
      showLogoutMessage: props.data.sessionExpired,
      timerRef
    };
  }

  public componentWillUnmount() {
    if (this.state.timerRef) {
      clearTimeout(this.state.timerRef);
    }
  }

  public render() {
    return (
      <div className={css(styles.containerWrapper)}>
        <div className={css(styles.container)}>
          {this.state.showLogoutMessage && (
            <InfoMessage
              text={['Your session was expired.', 'Please login again.']}
            >
              This message will be removed after <Timer time={3} />
            </InfoMessage>
          )}
          <Paper className={css(styles.paper)}>
            <Typography variant="h4" component="h1">
              About project
            </Typography>
            <Typography variant="h5" component="h2">
              What is this
            </Typography>
            <Typography component="p">
              This is web-based project management application
            </Typography>
            <Typography variant="h5" component="h2">
              How can I use this app
            </Typography>
            <Typography component="p">
              You can <Link to={ROUTES.AUTH.SIGN_UP}>Sing up</Link>!<br />
              Or <Link to={ROUTES.AUTH.LOGIN}>login</Link> if you already have
              an account
            </Typography>
            <Typography component="p">
              <dt>Project management</dt> is the practice of initiating,
              planning, executing, controlling, and closing the work of a team
              to achieve specific goals and meet specific success criteria at
              the specified time. A project is a temporary endeavor designed to
              produce a unique product, service or result with a defined
              beginning and end (usually time-constrained, and often constrained
              by funding or staffing) undertaken to meet unique goals and
              objectives, typically to bring about beneficial change or added
              value. The temporary nature of projects stands in contrast with
              business as usual (or operations),[3] which are repetitive,
              permanent, or semi-permanent functional activities to produce
              products or services. In practice, the management of such distinct
              production approaches requires the development of distinct
              technical skills and management strategies.[4] The primary
              challenge of project management is to achieve all of the project
              goals within the given constraints. This information is usually
              described in project documentation, created at the beginning of
              the development process. The primary constraints are scope, time,
              quality and budget.[6] The secondary — and more ambitious —
              challenge is to optimize the allocation of necessary inputs and
              apply them to meet pre-defined objectives. The object of project
              management is to produce a complete project which complies with
              the client's objectives. In many cases the object of project
              management is also to shape or reform the client's brief in order
              to feasibly be able to address the client's objectives. Once the
              client's objectives are clearly established they should influence
              all decisions made by other people involved in the project - for
              example project managers, designers, contractors and
              sub-contractors. Ill-defined or too tightly prescribed project
              management objectives are detrimental to decision making.
              <br />
              <br />
              Source:
              <a
                href="https://en.wikipedia.org/wiki/Project_management"
                target="_blank"
              >
                Wiki
              </a>
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect((state: any) => state.login)(StartPage);
