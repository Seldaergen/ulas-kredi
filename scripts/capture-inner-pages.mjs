import {spawn} from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import {verifyInnerPages} from './verify-inner-pages.mjs';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.tooling/playwright');
const {chromium}=await import('playwright');
const socket=net.createServer();await new Promise(resolve=>socket.listen(0,'127.0.0.1',resolve));
const port=socket.address().port;await new Promise(resolve=>socket.close(resolve));
const origin='http://127.0.0.1:'+port;
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{env:process.env,stdio:'ignore'});
let browser;
try {
 let ready=false;for(let i=0;i<150;i++){try{if((await fetch(origin+'/api/health')).ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,200));}
 if(!ready) throw Error('LOCAL_SERVER_UNAVAILABLE');
 browser=await chromium.launch({headless:true});await verifyInnerPages(browser,origin,process.argv[2]??'before');
} finally {await browser?.close();server.kill('SIGTERM');await new Promise(resolve=>{if(server.exitCode!==null)resolve();else server.once('exit',resolve);});}
