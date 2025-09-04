import React, { useEffect } from 'react';

const JdoodleEmbed = () => {
  useEffect(() => {
    // Load the JDoodle script
    const script = document.createElement('script');
    script.src = 'http://www.jdoodle.com/assets/jdoodle-pym.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* JDoodle Embed */}
      <div data-pym-src="http://www.jdoodle.com/embed/v1/174814c7b77e757f"></div>
    </div>
  );
};

export default JdoodleEmbed;
