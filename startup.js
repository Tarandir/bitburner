/** @param {NS} ns */
export async function main(ns) {
    // Array of all servers that don't need any ports opened
    // to gain root access. These have 16 GB of RAM
    const servers0Port = ["foodnstuff",
                        "sigma-cosmetics",
                        "joesguns",
                        "nectar-net",
                        "hong-fang-tea",
                        "harakiri-sushi",
                        "n00dles"];

    // Array of all servers that only need 1 port opened
    // to gain root access. These have 32 GB of RAM
    const servers1Port = ["neo-net",
                        "zer0",
                        "max-hardware",
                        "iron-gym",
                        "CSEC"];

    // Array of all servers that only need 2 ports opened
    // to gain root access. These have 32 GB of RAM
    const servers2Ports = ["silver-helix",
                        "omega-net",
                        "phantasy",
                        "johnson-ortho",
                        "crush-fitness",
                        "the-hub"];

    // Array of all servers that only need 3 ports opened
    // to gain root access. These have 16 GB of RAM
    const servers3Ports = ["netlink",
                        "rothman-uni",
                        "I.I.I.I",
                        "summit-uni",
                        "catalyst",
                        "millenium-fitness",
                        "rho-construction"];
              
    // Array of all servers that only need 4 ports opened
    // to gain root access. These have 32 GB of RAM
    const servers4Ports = ["alpha-ent",
                        "aevum-police",
                        "lexo-corp",
                        "syscore",
                        "global-pharm",
                        "univ-energy",
                        "unitalife",
                        "snap-fitness",
                        "applied-energetics",
                        "zb-def",
                        "nova-med"];

    // Array of all servers that only need 5 ports opened
    // to gain root access. These have 16 GB of RAM
    const servers5Ports = ["zb-institute",
                        "darkweb",
                        "deltaone",
                        "defcomm",
                        "galactic-cyber",
                        "aerocorp",
                        "omnia",
                        "icarus",
                        "zeus-med",
                        "infocomm",
                        "taiyang-digital",
                        "solaris"]

    // Copy our scripts onto each server that requires 0 ports
    // to gain root access. Then use nuke() to gain admin access and
    // run the scripts.
    for (let i = 0; i < servers0Port.length; ++i) {
        const serv = servers0Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 2);
    }

    // Wait until we acquire the "BruteSSH.exe" program
    while (!ns.fileExists("BruteSSH.exe")) {
        await ns.sleep(60000);
    }

    // Copy our scripts onto each server that requires 1 port
    // to gain root access. Then use brutessh() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers1Port.length; ++i) {
        const serv = servers1Port[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 3);
    }


    // Wait until we acquire the "FTPCrack.exe" program
    while (!ns.fileExists("FTPCrack.exe")) {
        await ns.sleep(60000);
    }

   // Copy our scripts onto each server that requires 2 ports
    // to gain root access. Then use brutessh(), stpcrack() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers2Ports.length; ++i) {
        const serv = servers2Ports[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        ns.ftpcrack(serv);
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 4);
    }


    // Wait until we acquire the "relaySMTP.exe" program
    while (!ns.fileExists("relaySMTP.exe")) {
        await ns.sleep(60000);
    }

   // Copy our scripts onto each server that requires 3 ports
    // to gain root access. Then use brutessh(), stpcrack() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers3Ports.length; ++i) {
        const serv = servers3Ports[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        ns.ftpcrack(serv);
        ns.relaysmtp(serv);
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 6);
    }
    

    // Wait until we acquire the "HTTPWorm.exe" program
    while (!ns.fileExists("HTTPWorm.exe")) {
        await ns.sleep(60000);
    }

   // Copy our scripts onto each server that requires 4 ports
    // to gain root access. Then use brutessh(), stpcrack(), httpworm() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers4Ports.length; ++i) {
        const serv = servers4Ports[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        ns.ftpcrack(serv);
        ns.relaysmtp(serv);
        ns.httpworm(serv);
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 6);
    }


    // Wait until we acquire the "SQLInject.exe" program
    while (!ns.fileExists("SQLInject.exe")) {
        await ns.sleep(60000);
    }

   // Copy our scripts onto each server that requires 5 ports
    // to gain root access. Then use brutessh(), stpcrack(), httpworm(), sqlinject() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers5Ports.length; ++i) {
        const serv = servers5Ports[i];

        ns.scp("early-hack-template.js", serv);
        ns.brutessh(serv);
        ns.ftpcrack(serv);
        ns.relaysmtp(serv);
        ns.httpworm(serv);
        ns.sqlinject(serv)
        ns.nuke(serv);
        ns.exec("early-hack-template.js", serv, 6);
    }

}
