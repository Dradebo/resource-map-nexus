-- Insert sample partners
INSERT INTO partners (name, description, website, email, phone, address, location, resource_type, status)
VALUES
  (
    'Bold in Africa',
    'Bold in Africa is a fashion incubator program designed to scale businesses, sharpen business skills, and strengthen networks in Uganda and the UK. The program focuses on early-stage fashion enterprises and supports micro, small, and medium fashion sector enterprises.',
    'https://www.boldinafrica.com/theboldwomanfellowship',
    'info@boldinafrica.com',
    '+256 700 000 000',
    'Kampala, Uganda',
    'Kampala',
    ARRAY['Training', 'Mentorship', 'Funding'],
    'approved'
  ),
  (
    'Center for Women in Energy and Natural Resources (CWEN)',
    'CWEN is dedicated to empowering women in the energy and natural resources sectors through capacity building, networking, and advocacy. They provide training and support for women entrepreneurs in these fields.',
    'https://www.cwen.or.ug/about',
    'info@cwen.or.ug',
    '+256 700 000 001',
    'Kampala, Uganda',
    'Kampala',
    ARRAY['Training', 'Mentorship', 'Networking'],
    'approved'
  ),
  (
    'Imuka Access',
    'Imuka Access connects entrepreneurs with funding and business expertise to fuel business growth. They provide business plan development, financial modeling, and investor pitch deck development services.',
    'https://imuka.co',
    'info@imuka.co',
    '+256 788 320 403',
    'Bukasa, Wakiso, Sentema Road',
    'Wakiso',
    ARRAY['Training', 'Funding', 'Mentorship', 'Business Development'],
    'approved'
  ),
  (
    'Muni University ICT Innovation Hub',
    'The Regional ICT Innovation Hub at Muni University accelerates the growth of the ICT ecosystem in Uganda. They provide training, workspace, and resources for ICT innovators in the West Nile region.',
    'https://muni.ac.ug',
    'inquiries@muni.ac.ug',
    '+256 476 420 311',
    'P.O. Box 725, Arua - Uganda',
    'Arua',
    ARRAY['Training', 'Equipment', 'Workspace', 'Internet Access'],
    'approved'
  ); 