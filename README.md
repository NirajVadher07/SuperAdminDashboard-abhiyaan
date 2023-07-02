![Abhiyaan](/public/icon.png)

# Super Admin Dashboard
This is a [Next.js](https://nextjs.org/) project 

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Routes
- Home ```/```
- Village ```/village```
    - VillageDetails ```/village/[id]```    
        1. Notice ```/village/[id]/notice```        
        2. Complaints ```/village/[id]/complaint```
        3. News ```/village/[id]/news```
- News ```/news/[id]```
- Contact ```/contact```
- About ```/about```
- Login ```/auth/login```

# Components
- ```Header.js```
- ```Footer.js```
- ```ListVillage.js```
- ```Loader.js```
- ```ImageSlidder.js```
- ```MemberCard.js```
- ```Notice.js```
- ```Complaint.js```
- ```News.js```

# Utils
- ```checkAuth.js```
- ```Logout.js```
- ```UploadImage.js```

# API
- ```ApiCall.js```

