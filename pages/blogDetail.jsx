import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Row, Col } from 'reactstrap';

import { getBlogBySlug } from '../actions';

class BlogDetail extends Component {

    static async getInitialProps({query}) {

        let blog = {};
        const slug = query.slug;

        try {
            blog = await getBlogBySlug(slug);
        } catch (err) {
            console.error(err);
        }

        return {blog};
    }


  render() {

    const { blog } = this.props;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="blog-detail-page">
        <Row>
            <Col md="8" offset="2" md={{ size: 8, offset: 2 }}>
                <div dangerouslySetInnerHTML={{__html: blog.story}}></div>
            </Col>
        </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default BlogDetail;
