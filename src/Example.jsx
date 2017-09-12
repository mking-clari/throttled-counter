import classNames from 'classnames';
import React from 'react';

import styles from './Example.scss';

export default function Example({
  className,
}) {
  return (
    <h1 className={classNames(styles.example, className)}>
      Hello, world!
    </h1>
  );
}
