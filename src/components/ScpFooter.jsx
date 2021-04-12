import React, { PureComponent } from 'react'

class ScpFooter extends PureComponent {
    render() {
        return (
            <footer style={{ marginTop: "15px", }}>
                <h3>This is a clone of <a href="http://scp-wiki.wikidot.com">scpwiki.com</a></h3>
                <p>All copyright belongs to their respective owners. <br /> For infos please contact the owner of the website</p>
            </footer>
        )
    }
}

export default ScpFooter