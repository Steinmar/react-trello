import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { ROUTES } from 'src/core/Routes';

const TEXT_INDENT = '10px';

const styles = StyleSheet.create({
  containerWrapper: {
    width: '100%',
    height: '100%',
    margin: '10px 0'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '800px',
    margin: 'auto'
  },
  paragraph: {
    padding: TEXT_INDENT
  },
  header: {
    padding: TEXT_INDENT
  }
});

function StartPage(props: any) {
  return (
    <div className={css(styles.containerWrapper)}>
      <div className={css(styles.container)}>
        <section>
          <h1 className={css(styles.header)}>About project</h1>
          <h2 className={css(styles.header)}>What is this</h2>
          <p className={css(styles.paragraph)}>
            This is web-based project management application{' '}
          </p>
          <h2 className={css(styles.header)}>How can I use this app</h2>
          <p className={css(styles.paragraph)}>
            You can <a href={ROUTES.AUTH.SIGN_UP}>Sing up</a> <br />
            Or <a href={ROUTES.AUTH.LOGIN}>login</a> if you already have an
            account
          </p>
        </section>
        <section>
          <p className={css(styles.paragraph)}>
            <dt>Project management</dt> is the practice of initiating, planning,
            executing, controlling, and closing the work of a team to achieve
            specific goals and meet specific success criteria at the specified
            time. A project is a temporary endeavor designed to produce a unique
            product, service or result with a defined beginning and end (usually
            time-constrained, and often constrained by funding or staffing)
            undertaken to meet unique goals and objectives, typically to bring
            about beneficial change or added value. The temporary nature of
            projects stands in contrast with business as usual (or
            operations),[3] which are repetitive, permanent, or semi-permanent
            functional activities to produce products or services. In practice,
            the management of such distinct production approaches requires the
            development of distinct technical skills and management
            strategies.[4] The primary challenge of project management is to
            achieve all of the project goals within the given constraints. This
            information is usually described in project documentation, created
            at the beginning of the development process. The primary constraints
            are scope, time, quality and budget.[6] The secondary — and more
            ambitious — challenge is to optimize the allocation of necessary
            inputs and apply them to meet pre-defined objectives. The object of
            project management is to produce a complete project which complies
            with the client's objectives. In many cases the object of project
            management is also to shape or reform the client's brief in order to
            feasibly be able to address the client's objectives. Once the
            client's objectives are clearly established they should influence
            all decisions made by other people involved in the project - for
            example project managers, designers, contractors and
            sub-contractors. Ill-defined or too tightly prescribed project
            management objectives are detrimental to decision making.
            <br />
            <br />
            Source:{' '}
            <a href="https://en.wikipedia.org/wiki/Project_management">Wiki</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default StartPage;
