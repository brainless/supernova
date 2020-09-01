import React from "react";

import { Section, Hx } from "components/LayoutHelpers";


export default () => (
  <Section extraClasses="bg-white">
    <div id="Get_Early_Access" />

    <div className="max-w-screen-lg mx-2 md:mx-auto">
      <Hx x="2">Subscribe &amp; Get early access!</Hx>
      <div className="text-xl">
        <p><strong>dwata</strong> is actively developed and we are working with early adopters.</p>
      </div>
      {/* Begin Mailchimp Signup Form */}
      <div>
        <form
          action="https://dwata.us8.list-manage.com/subscribe/post?u=637faf509a5896debdab58eda&amp;id=d781c5751b"
          method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
          target="_blank" noValidate>
          <div>
            <div className="field">
              <label htmlFor="mce-EMAIL" className="block text-xl font-bold">Subscribe to our newsletter</label>
              <input className="my-2 text-2xl border rounded py-2 px-4" type="email" name="EMAIL" id="mce-EMAIL" placeholder="someone@domain.com" required />
              <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                className="text-2xl bg-blue-500 text-white font-bold hover:bg-blue-800 rounded border rounded ml-6 py-2 px-12" />
            </div>
            {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
            <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_637faf509a5896debdab58eda_d781c5751b" tabIndex="-1" /></div>
          </div>
        </form>
      </div>
      {/* End mc_embed_signup */}
    </div>
  </Section>
);