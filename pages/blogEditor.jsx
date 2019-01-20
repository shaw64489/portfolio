import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';

import SlateEditor from '../components/slate-editor/Editor';

import { saveBlog } from '../actions';

class BlogEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSaving: false
    }

    this.saveBlog = this.saveBlog.bind(this);
  }

  saveBlog(heading) {

    const blog = {};
    blog.title = heading.title;
    blog.subtitle = heading.subtitle;
    this.setState({ isSaving: true });

    //call actions saveBlog
    saveBlog().then(data => {
      this.setState({ isSaving: false });
      console.log(data);
    })
  }

  render() {

    const { isSaving } = this.state;
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor isLoading={isSaving} save={this.saveBlog}/>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(BlogEditor);
