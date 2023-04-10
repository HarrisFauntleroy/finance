/**
 * This page containers the UI for the API docs
 */
import { Page } from 'ui';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Docs = () => {
  return (
    <Page>
      <SwaggerUI url="/swagger.json" />
    </Page>
  );
};

Docs.auth = false;
export default Docs;
