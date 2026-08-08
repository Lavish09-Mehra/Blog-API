import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

import { Blog } from './blogData.js';

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("succesfully connected to Database..");
        app.listen(3000, () => {
            console.log('server starts at http://localhost:3000')
        })
    })
    .catch((err) => {
        console.error(err);
    })

app.get('/health', (req, res) => {
    res.status(200).json({
    message: 'I am Up boss..',
    Up: 'ok',
    status: 'healthy',
    service: 'online',
    server: 'running',
    database: 'connected',
    uptime: '99.99%',
    environment: 'production',
    version: '1.0.0',
    timestamp: new Date().toISOString()
    })
})

app.post('/api/create-blog', async(req, res) => {
    try{
    const { title, creator, blog, keywords } = req.body

        if(!title || !creator || !blog || !keywords ){
            res.status(400).json({
                message: 'Aww.. you have to fill all 4 feilds'
            })
        }

    const Blogs = new Blog({
        title, 
        creator,
        blog,
        keywords
    });
    const result = await Blogs.save();
    return res.status(200).json({
        message: 'Succes..',
        result
    })

    }   catch (err){
        res.status(501).json({
            message: 'Oops.. Something Went wrong',
            err
        })
    }
})

app.get('/api/blogs', async (req, res) => {
    try{
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs)
    } catch(err){
        res.status(501).json({
            message: 'oops.. Blog not found',
            err
        })
    }
});

app.get('/api/blog-of/:username', async (req, res) => {
    try{
        const username = req.params.username;
        
        if(!username){
            res.status(404).json({
                message: `${profile} Not Found`
            })
        }
        const blogs = await Blog.find({ creator: username }).sort({
            createdAt: -1
        })

        return res.status(200).json({
            message: 'Successfully fetched..',
            blogs
        })

    }   catch(err){
        res.status(404).json({
            message: 'Oops.. Something went wrong here..',
            err
        })
    }

});

app.get('/api/blog/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;

        if (!keyword) {
            return res.status(400).json({
                message: 'Please provide a keyword'
            });
        }

        const blogs = await Blog.find({ keywords: keyword }).sort({
            createdAt: -1
        });

        if (!blogs.length) {
            return res.status(404).json({
                message: 'No blogs found for that keyword'
            });
        }

        return res.status(200).json({
            message: 'Blog found successfully',
            blogs
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Oops.. Not found',
            err
        });
    }
});