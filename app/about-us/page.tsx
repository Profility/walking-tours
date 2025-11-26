"use client";

export default function Home() {
  return (
    <div>
      <div className="w-full max-w-100 md:max-w-250 mx-auto py-10 px-4">
        <h1 className="font-bold text-2xl">About the Website</h1><br/>
        <p className="text-lg text-justify">Lakbay Lucban is a QR-code web-based information system serving as centralized guides to enhance the trip planning and visitor experience in Lucban, Quezon by offering details about destinations selected by the Tourism Office of Lucban. This website was made as the output of a research conducted by Lucban Academy Senior Highschool Grade-12 Students to modernize the tourism experience in Lucban, Quezon.</p>
        <br/><p className="text-lg text-justify">This website was created using the following technologies; NextJS as the front-end, TailwindCSS for the styling, and ShadCN as component library. Other miscellaneous technologies such as Google Maps integration through embeds, GitHub for version control, and Vercel for static-site hosting.</p>      
      </div>
      {/* <div className="w-full max-w-100 md:max-w-250 mx-auto px-4">
        <h1 className="font-bold text-2xl">Contact Us</h1><br/>
        <p className="text-lg text-justify">You can contact us via socials, e-mail or phone, feel free to contact us regarding questions, suggestions or feedback about the website!</p>
        <br/><ul>
          <li>
            <b>Phone Number:</b> +09999999999
          </li>
          <li>
            <b>Email Address:</b> placeholder@gmail.com
          </li>
          <li>
            <b>Facebook:</b> Placeholder
          </li>
        </ul>
      </div> */}
    </div>
  );
}
