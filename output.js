//Sat Feb 21 2026 15:12:12 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
#!/usr/bin/env node
const crypto = require("crypto");
const axios = require("axios");
const DEFAULTS = {
  ecpmMin: 500,
  ecpmMax: 1500,
  maxClaims: 10,
  delayRange: [120, 180],
  withdrawThreshold: 5000,
  maxWithdrawals: 10,
  videoTimes: 10,
  videoInterval: [20, 40]
};
function getAllAccounts() {
  const _0x11a038 = [];
  let _0x5d1e14 = 1;
  while (true) {
    const _0x32d1c7 = "XFHK" + _0x5d1e14;
    const _0x1f4cea = process.env[_0x32d1c7];
    if (!_0x1f4cea) {
      break;
    }
    const _0x1114d4 = _0x1f4cea.split("#");
    if (_0x1114d4.length >= 5) {
      const _0x50b179 = {
        index: _0x5d1e14,
        accessKey: _0x1114d4[0],
        androidId: _0x1114d4[1],
        oaid: _0x1114d4[2],
        deviceId: _0x1114d4[2],
        brand: _0x1114d4[3],
        model: _0x1114d4[4],
        ecpmMin: getAccountConfig(_0x5d1e14, "ECPM_MIN", DEFAULTS.ecpmMin),
        ecpmMax: getAccountConfig(_0x5d1e14, "ECPM_MAX", DEFAULTS.ecpmMax),
        maxClaims: getAccountConfig(_0x5d1e14, "MAX_CLAIMS", DEFAULTS.maxClaims),
        delayMin: getAccountConfig(_0x5d1e14, "DELAY_MIN", DEFAULTS.delayRange[0]),
        delayMax: getAccountConfig(_0x5d1e14, "DELAY_MAX", DEFAULTS.delayRange[1]),
        maxWithdrawals: getAccountConfig(_0x5d1e14, "MAX_WITHDRAWALS", DEFAULTS.maxWithdrawals),
        videoTimes: getAccountConfig(_0x5d1e14, "VIDEO_TIMES", DEFAULTS.videoTimes),
        videoInterval: getVideoIntervalConfig(_0x5d1e14, DEFAULTS.videoInterval),
        withdrawThreshold: getTxCoinConfig(_0x5d1e14, DEFAULTS.withdrawThreshold)
      };
      _0x11a038.push(_0x50b179);
      console.log("✅ 找到账号 " + _0x5d1e14 + ": " + _0x50b179.accessKey.split("_")[1]);
    } else {
      console.error("❌ 账号 " + _0x5d1e14 + " 环境变量格式错误，跳过");
    }
    _0x5d1e14++;
  }
  return _0x11a038;
}
function getAccountConfig(_0x57d075, _0x3378fa, _0x36edaa) {
  const _0x152a88 = "XFHK" + _0x57d075 + "_" + _0x3378fa;
  const _0xdb8e50 = process.env[_0x152a88];
  if (_0xdb8e50 !== undefined) {
    const _0x135966 = parseInt(_0xdb8e50);
    if (!isNaN(_0x135966)) {
      return _0x135966;
    }
  }
  return _0x36edaa;
}
function getVideoIntervalConfig(_0xbdb54a, _0x55208f) {
  const _0x4bd9c4 = "XFHK" + _0xbdb54a + "_VIDEO_JG";
  const _0x27d88b = process.env[_0x4bd9c4];
  if (_0x27d88b !== undefined && _0x27d88b.includes("-")) {
    {
      const _0x4db5d6 = _0x27d88b.split("-");
      if (_0x4db5d6.length === 2) {
        const _0x16cedb = parseInt(_0x4db5d6[0]);
        const _0x1b2653 = parseInt(_0x4db5d6[1]);
        if (!isNaN(_0x16cedb) && !isNaN(_0x1b2653) && _0x16cedb <= _0x1b2653) {
          {
            return [_0x16cedb, _0x1b2653];
          }
        }
      }
    }
  }
  return _0x55208f;
}
function getTxCoinConfig(_0x49a84e, _0x53316d) {
  const _0x191bb7 = "TXcoin" + _0x49a84e;
  const _0x19b80f = process.env[_0x191bb7];
  if (_0x19b80f !== undefined) {
    {
      const _0x271cb0 = parseInt(_0x19b80f);
      if (!isNaN(_0x271cb0)) {
        {
          console.log("💰 账号 " + _0x49a84e + " 从环境变量 TXcoin" + _0x49a84e + " 读取阈值: " + _0x271cb0);
          return _0x271cb0;
        }
      }
    }
  }
  return _0x53316d;
}
const ACCOUNTS = getAllAccounts();
ACCOUNTS.length === 0 && (console.error("❌ 未找到任何账号配置，请设置环境变量 XFHK1, XFHK2, XFHK3..."), console.error("格式: accessKey#androidId#oaid#brand#model"), process.exit(1));
console.log("\n📊 共找到 " + ACCOUNTS.length + " 个账号\n");
const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQM1/XC2L9NNxi6IlvMUjF6zUf2Xb6z8CKYnyg4rp45rDyOtFSPfrCWbLwZlFUjw9U7aMeZUqhC+/ug6uHeV+0ztsG2xfOzD5HvQFFUCe2+Jxugv1yHIWan8sabhTYFqV5NTTrop0f2UB69S+Frp2X/YZtGYb47Xjh9yW7u7y6kwIDAQAB";
const VIDEO_PUBLIC_KEY = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIvrbMM3mHUceVQlJwTwsZIvBmA6iN5SuqQu01VSpK8wO7pjVwNi/8N78a2xNcs9VsIId3J0+VUW9CwLWHMWKRECAwEAAQ==";
function random(_0x3ba598, _0x55ef92) {
  return Math.floor(Math.random() * (_0x55ef92 - _0x3ba598 + 1)) + _0x3ba598;
}
function sleep(_0x41309e) {
  return new Promise(_0xee117b => setTimeout(_0xee117b, _0x41309e));
}
function getSignWithTimestamp(_0x212b35, _0x4716b0, _0x5a008c, _0x39abdb = "0", _0x356451 = "", _0x2c9a9d = false) {
  const _0xb9015e = _0x212b35 + "-" + _0x5a008c + "-" + _0x4716b0 + "-" + _0x39abdb + "-" + _0x356451;
  try {
    {
      const _0x101444 = _0x2c9a9d ? VIDEO_PUBLIC_KEY : PUBLIC_KEY;
      const _0x2146c4 = "-----BEGIN PUBLIC KEY-----\n" + _0x101444 + "\n-----END PUBLIC KEY-----";
      const _0xed0a54 = crypto.publicEncrypt({
        key: _0x2146c4,
        padding: crypto.constants.RSA_PKCS1_PADDING
      }, Buffer.from(_0xb9015e, "utf8"));
      const _0x1209b5 = _0xed0a54.toString("base64");
      return _0x1209b5;
    }
  } catch (_0x3d447e) {
    console.error("RSA加密失败:", _0x3d447e.message);
    return "";
  }
}
function getSign(_0x16f173, _0x51c6c6 = 0, _0x446a38 = "0", _0x4c147d = "") {
  const _0x419c5e = Date.now();
  return getSignWithTimestamp(_0x16f173, _0x51c6c6, _0x419c5e, _0x446a38, _0x4c147d, false);
}
function getVideoSignWithTimestamp(_0x57fb31, _0x24bff2, _0x35ab5b, _0x3040b1 = "0", _0x51e2eb = "") {
  return getSignWithTimestamp(_0x57fb31, _0x24bff2, _0x35ab5b, _0x3040b1, _0x51e2eb, true);
}
function getBaseHeaders(_0x2157d7) {
  const _0x228297 = {
    "User-Agent": "Dalvik/2.1.0 (Linux; U; Android " + (_0x2157d7.osVersion || "10") + "; " + _0x2157d7.model + " Build/QKQ1.191008.001)",
    Connection: "Keep-Alive",
    "Accept-Encoding": "identity",
    androidId: _0x2157d7.androidId,
    oaid: _0x2157d7.oaid,
    targetApi: "29",
    brand: _0x2157d7.brand,
    osVersion: _0x2157d7.osVersion || "10",
    romVersion: "1.0.1",
    appVersion: "1.1.7",
    channel: "cbdxfhk12b",
    os: "android",
    mac: "",
    bs: "default",
    model: _0x2157d7.model,
    ua: "Mozilla/5.0 (Linux; Android " + (_0x2157d7.osVersion || "10") + "; " + _0x2157d7.model + " Build/QKQ1.191008.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.92 Mobile Safari/537.36",
    deviceId: _0x2157d7.deviceId,
    gps: "0.0,0.0",
    pkgId: "1310",
    accessKey: _0x2157d7.accessKey
  };
  return _0x228297;
}
async function getVideoAd(_0x2ce9e0, _0x131ef9) {
  const _0x1f9a39 = "https://bp-api.hnshamu.com/shua-xfhk/look/ad/video";
  const _0x4157a2 = _0x2ce9e0.accessKey.split("_")[1];
  const _0x2cde45 = Date.now() + 300000;
  const _0x588b00 = {
    host: "bp-api.hnshamu.com",
    sign: getVideoSignWithTimestamp(_0x4157a2, _0x131ef9, _0x2cde45),
    os: "android",
    brand: _0x2ce9e0.brand,
    model: _0x2ce9e0.model,
    osversion: _0x2ce9e0.osVersion || "15",
    romversion: "default",
    bs: "default",
    isvp: "true",
    appversion: "1.1.7",
    clientversion: "1170",
    sdkversion: "20.0.0.0.0.9",
    channel: "cbdxfhk12b",
    appid: "1705",
    ua: "Mozilla/5.0 (Linux; Android " + (_0x2ce9e0.osVersion || "15") + "; " + _0x2ce9e0.model + " Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.260 Mobile Safari/537.36",
    "user-agent": "Mozilla/5.0 (Linux; Android " + (_0x2ce9e0.osVersion || "15") + "; " + _0x2ce9e0.model + " Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.260 Mobile Safari/537.36",
    pkg: "com.whyd.xfhk",
    pkgid: "1310",
    product: "xfhk",
    mac: "",
    oaid: _0x2ce9e0.oaid,
    deviceid: _0x2ce9e0.deviceId,
    androidid: _0x2ce9e0.androidId,
    gps: "todo",
    accesskey: _0x2ce9e0.accessKey,
    "accept-encoding": "gzip"
  };
  try {
    {
      const _0x351f57 = {
        position: 209,
        adType: 109948
      };
      const _0x570239 = {
        params: _0x351f57,
        headers: _0x588b00,
        timeout: 10000
      };
      const _0x312417 = await axios.get(_0x1f9a39, _0x570239);
      const _0x732719 = {
        success: true,
        status: _0x312417.status,
        data: _0x312417.data,
        timestamp: _0x2cde45
      };
      return _0x732719;
    }
  } catch (_0x2f02da) {
    if (_0x2f02da.response) {
      {
        const _0xac9916 = {
          success: false,
          status: _0x2f02da.response.status,
          data: _0x2f02da.response.data,
          error: _0x2f02da.message
        };
        return _0xac9916;
      }
    }
    const _0x26fc77 = {
      success: false,
      error: _0x2f02da.message
    };
    return _0x26fc77;
  }
}
async function receiveAdReward(_0x489924, _0x396aa6, _0x5eb3e9, _0x2ea3bb) {
  const _0x99049d = "https://bp-api.shinet.cn/shua-xfhk/add/gold";
  const _0xec7a8e = _0x489924.accessKey.split("_")[1];
  const _0x51889a = Math.max(0, _0x2ea3bb - 20);
  const _0x4b000c = getBaseHeaders(_0x489924);
  const _0x555205 = getVideoSignWithTimestamp(_0xec7a8e, _0x5eb3e9, _0x396aa6, _0x51889a.toString());
  _0x4b000c.sign = _0x555205;
  try {
    {
      const _0x45dc06 = {
        position: 209
      };
      const _0x38b0d7 = {
        params: _0x45dc06,
        headers: _0x4b000c,
        timeout: 10000
      };
      const _0x53ea52 = await axios.get(_0x99049d, _0x38b0d7);
      const _0x235dcf = {
        success: true,
        status: _0x53ea52.status,
        data: _0x53ea52.data
      };
      return _0x235dcf;
    }
  } catch (_0x445295) {
    if (_0x445295.response) {
      {
        const _0x5cc6e9 = {
          success: false,
          status: _0x445295.response.status,
          data: _0x445295.response.data,
          error: _0x445295.message
        };
        return _0x5cc6e9;
      }
    }
    const _0x4ac8e6 = {
      success: false,
      error: _0x445295.message
    };
    return _0x4ac8e6;
  }
}
async function getWithdrawPage(_0x1317e0) {
  const _0x595aa3 = "https://bp-api.shinet.cn/shua-xfhk//gold/withdraw/page";
  const _0x1dd315 = getBaseHeaders(_0x1317e0);
  _0x1dd315.sign = "abc";
  try {
    {
      const _0x3fa5df = {
        headers: _0x1dd315,
        timeout: 10000
      };
      const _0x4fa4f6 = await axios.get(_0x595aa3, _0x3fa5df);
      const _0x1c3d3d = _0x4fa4f6.data;
      if (_0x1c3d3d.code === 0) {
        const _0x4a5873 = _0x1c3d3d.result;
        const _0x279324 = _0x4a5873.curTaskNum || 0;
        const _0x54ae76 = _0x4a5873.gold || 0;
        const _0x8679a9 = {
          curTaskNum: _0x279324,
          gold: _0x54ae76,
          success: true,
          data: _0x4a5873
        };
        return _0x8679a9;
      } else {
        {
          const _0x1d45a9 = {
            curTaskNum: 0,
            gold: 0,
            success: false,
            message: _0x1c3d3d.message
          };
          return _0x1d45a9;
        }
      }
    }
  } catch (_0x3722ed) {
    console.error("❌ 账号 " + _0x1317e0.index + " 获取提现页面异常:", _0x3722ed.message);
    if (_0x3722ed.response) {
      {
        console.error("状态码:", _0x3722ed.response.status);
      }
    }
    const _0x8f00a1 = {
      curTaskNum: 0,
      gold: 0,
      success: false,
      message: _0x3722ed.message
    };
    return _0x8f00a1;
  }
}
async function receiveTaskReward(_0x47cf99, _0x498814, _0x774d84) {
  const _0x32de10 = "https://bp-api.shinet.cn/shua-xfhk/receive/task/reward";
  const _0x10b73b = _0x47cf99.accessKey.split("_")[1];
  const _0x1886e6 = random(_0x47cf99.ecpmMin, _0x47cf99.ecpmMax);
  const _0x200d70 = getBaseHeaders(_0x47cf99);
  const _0x559fec = getSign(_0x10b73b, _0x1886e6);
  _0x200d70.sign = _0x559fec;
  try {
    const _0x1380b8 = {
      id: _0x498814,
      times: _0x774d84
    };
    const _0x5c68a6 = {
      params: _0x1380b8,
      headers: _0x200d70,
      timeout: 10000
    };
    const _0x3486d6 = await axios.get(_0x32de10, _0x5c68a6);
    return _0x3486d6.data;
  } catch (_0x411666) {
    console.error("❌ 账号 " + _0x47cf99.index + " 领取奖励请求失败:", _0x411666.message);
    _0x411666.response && console.error("状态码:", _0x411666.response.status);
    const _0x5694bb = {
      code: -1,
      message: _0x411666.message
    };
    return _0x5694bb;
  }
}
async function withdraw(_0x576c11) {
  const _0x162a2f = "https://bp-api.shinet.cn/shua-xfhk//gold/withdraw";
  const _0x371192 = _0x576c11.accessKey.split("_")[1];
  const _0x4cd36c = random(_0x576c11.ecpmMin, _0x576c11.ecpmMax);
  const _0x181cec = getBaseHeaders(_0x576c11);
  const _0x34ba38 = getSign(_0x371192, _0x4cd36c);
  _0x181cec.sign = _0x34ba38;
  try {
    const _0xe8af3d = {
      type: 1
    };
    const _0x3d9ed7 = {
      params: _0xe8af3d,
      headers: _0x181cec,
      timeout: 10000
    };
    const _0xccb020 = await axios.get(_0x162a2f, _0x3d9ed7);
    const _0x2e3efe = _0xccb020.data;
    if (_0x2e3efe.message) {
      {
        console.log("📨 账号 " + _0x576c11.index + " 提现返回消息: " + _0x2e3efe.message);
        console.log("⚠️ 账号 " + _0x576c11.index + " 建议不要再运行");
        const _0x174d11 = {
          success: false,
          shouldStop: true,
          message: _0x2e3efe.message
        };
        return _0x174d11;
      }
    } else {
      {
        console.log("✅ 账号 " + _0x576c11.index + " 提现成功!");
        const _0x2278c9 = {
          success: true,
          shouldStop: false,
          data: _0x2e3efe
        };
        return _0x2278c9;
      }
    }
  } catch (_0x333ab9) {
    {
      console.error("❌ 账号 " + _0x576c11.index + " 提现请求失败:", _0x333ab9.message);
      if (_0x333ab9.response) {
        console.error("状态码:", _0x333ab9.response.status);
        if (_0x333ab9.response.data && _0x333ab9.response.data.message) {
          console.log("📨 账号 " + _0x576c11.index + " 提现返回消息: " + _0x333ab9.response.data.message);
          console.log("⚠️ 账号 " + _0x576c11.index + " 建议不要再运行");
          const _0x8771c5 = {
            success: false,
            shouldStop: true,
            message: _0x333ab9.response.data.message
          };
          return _0x8771c5;
        }
      }
      const _0x118694 = {
        success: false,
        shouldStop: false,
        message: _0x333ab9.message
      };
      return _0x118694;
    }
  }
}
async function processVideoAds(_0x3beffa) {
  console.log("\n📹 开始执行视频广告，计划执行 " + _0x3beffa.videoTimes + " 次");
  console.log("📹 使用新RSA公钥，ecpm范围: 40-80");
  let _0x16682c = 0;
  let _0x11d4ee = 0;
  for (let _0x4a14e7 = 0; _0x4a14e7 < _0x3beffa.videoTimes; _0x4a14e7++) {
    console.log("\n--- 视频广告第 " + (_0x4a14e7 + 1) + "/" + _0x3beffa.videoTimes + " 次 ---");
    const _0x3c5e3d = random(40, 80);
    console.log("📌 当前ecpm: " + _0x3c5e3d);
    console.log("📹 获取广告...");
    let _0x22fd35 = await getVideoAd(_0x3beffa, _0x3c5e3d);
    if (_0x22fd35.success && _0x22fd35.data.code === 0) {
      console.log("✅ 获取广告成功");
      const _0x121fcb = _0x22fd35.data.result?.["redBag"] || 0;
      console.log("💰 广告redBag值: " + _0x121fcb);
      await sleep(2000);
      console.log("💰 领取广告奖励 (reward = " + _0x121fcb + " - 20 = " + Math.max(0, _0x121fcb - 20) + ")...");
      let _0x1a0d9c = await receiveAdReward(_0x3beffa, _0x22fd35.timestamp, _0x3c5e3d, _0x121fcb);
      if (_0x1a0d9c.success && _0x1a0d9c.data.code === 0) {
        {
          const _0x5bde10 = _0x1a0d9c.data.result?.["gold"] || 0;
          console.log("✅ 领取奖励成功! 获取到 " + _0x5bde10 + " 金币");
          _0x11d4ee += _0x5bde10;
          _0x16682c++;
          await sleep(2000);
          const {
            gold: _0x33c79a
          } = await getWithdrawPage(_0x3beffa);
          console.log("💰 当前金币总数: " + _0x33c79a);
          if (_0x33c79a >= _0x3beffa.withdrawThreshold) {
            {
              console.log("💰 金币(" + _0x33c79a + ")达到提现阈值(" + _0x3beffa.withdrawThreshold + ")，执行提现");
              const _0x2d2025 = await withdraw(_0x3beffa);
              if (_0x2d2025.success) {
                console.log("💳 提现成功");
                await sleep(3000);
                const _0x1f9ade = await getWithdrawPage(_0x3beffa);
                _0x1f9ade.success && console.log("提现后金币: " + _0x1f9ade.gold);
              }
            }
          }
        }
      } else {
        {
          console.log("❌ 领取奖励失败: " + (_0x1a0d9c.error || _0x1a0d9c.data?.["message"] || "未知错误"));
        }
      }
    } else {
      console.log("❌ 获取广告失败: " + (_0x22fd35.error || _0x22fd35.data?.["message"] || "未知错误"));
    }
    if (_0x4a14e7 < _0x3beffa.videoTimes - 1) {
      {
        const _0x574cbf = random(_0x3beffa.videoInterval[0], _0x3beffa.videoInterval[1]);
        console.log("⏱️ 等待 " + _0x574cbf + " 秒后执行下一次视频广告...");
        await sleep(_0x574cbf * 1000);
      }
    }
  }
  console.log("\n📊 视频广告执行完成:");
  console.log("   成功次数: " + _0x16682c + "/" + _0x3beffa.videoTimes);
  console.log("   获得金币: " + _0x11d4ee);
  return _0x16682c;
}
async function processAccount(_0x34ba71) {
  console.log("\n" + "=".repeat(60));
  console.log("🌸 开始处理账号 " + _0x34ba71.index);
  console.log("" + "=".repeat(60));
  const _0x1b088e = _0x34ba71.accessKey.split("_")[1];
  console.log("📱 用户ID: " + _0x1b088e);
  console.log("📱 设备: " + _0x34ba71.brand + " " + _0x34ba71.model + " (Android " + (_0x34ba71.osVersion || "10") + ")");
  console.log("🎯 视频广告次数: " + _0x34ba71.videoTimes);
  console.log("⏱️ 视频广告间隔: " + _0x34ba71.videoInterval[0] + "-" + _0x34ba71.videoInterval[1] + " 秒");
  console.log("🎯 最大领取次数: " + _0x34ba71.maxClaims);
  console.log("⏱️ 领取间隔: " + _0x34ba71.delayMin + "-" + _0x34ba71.delayMax + " 秒");
  console.log("💰 提现阈值: " + _0x34ba71.withdrawThreshold);
  console.log("💳 最大提现次数: " + _0x34ba71.maxWithdrawals);
  console.log("\n📊 查询初始状态...");
  const {
    gold: _0x1dd6f4
  } = await getWithdrawPage(_0x34ba71);
  console.log("初始金币: " + _0x1dd6f4);
  const _0x2cba24 = await processVideoAds(_0x34ba71);
  let _0x286370 = 0;
  let _0xff63a3 = 0;
  let _0x3e628a = 0;
  let _0x559c09 = true;
  let _0x42277d = 0;
  let _0x500281 = 0;
  const _0x3a44da = 3;
  while (_0x286370 < _0x34ba71.maxClaims && _0x559c09 && _0x42277d < _0x3a44da && _0x500281 < _0x34ba71.maxWithdrawals) {
    console.log("\n--- 第 " + (_0x286370 + 1) + "/" + _0x34ba71.maxClaims + " 次任务领取 ---");
    const {
      curTaskNum: _0x448c85,
      gold: _0x52d846,
      success: _0x4519a1
    } = await getWithdrawPage(_0x34ba71);
    if (!_0x4519a1) {
      {
        console.log("❌ 获取任务状态失败");
        _0x42277d++;
        if (_0x42277d >= _0x3a44da) {
          {
            console.log("⚠️ 连续失败 " + _0x3a44da + " 次，停止当前账号");
            break;
          }
        }
        const _0x5282c1 = random(_0x34ba71.delayMin, _0x34ba71.delayMax);
        console.log("⏱️ 等待 " + _0x5282c1 + " 秒后继续...");
        await sleep(_0x5282c1 * 1000);
        continue;
      }
    }
    _0x42277d = 0;
    console.log("当前金币: " + _0x52d846 + ", 当前任务进度: " + _0x448c85);
    if (_0x52d846 >= _0x34ba71.withdrawThreshold) {
      {
        console.log("💰 金币(" + _0x52d846 + ")达到提现阈值(" + _0x34ba71.withdrawThreshold + ")，执行提现");
        const _0x44e085 = await withdraw(_0x34ba71);
        if (_0x44e085.success) {
          _0x500281++;
          console.log("💳 已提现 " + _0x500281 + "/" + _0x34ba71.maxWithdrawals + " 次");
          await sleep(3000);
          const _0x345fc3 = await getWithdrawPage(_0x34ba71);
          _0x345fc3.success && console.log("提现后金币: " + _0x345fc3.gold);
          if (_0x500281 >= _0x34ba71.maxWithdrawals) {
            {
              console.log("🎯 已达到最大提现次数(" + _0x34ba71.maxWithdrawals + ")，停止当前账号");
              break;
            }
          }
        } else {
          if (_0x44e085.shouldStop) {
            console.log("⚠️ 账号 " + _0x34ba71.index + " 因提现返回消息停止运行");
            break;
          }
        }
      }
    }
    if (_0x448c85 <= 0) {
      {
        console.log("ℹ️ 当前没有可领取的任务");
        _0x559c09 = false;
        break;
      }
    }
    if (_0x3e628a === _0x448c85) {
      console.log("⚠️ 任务ID(" + _0x448c85 + ")未变化，可能已无新任务");
      _0x559c09 = false;
      break;
    }
    _0x3e628a = _0x448c85;
    console.log("🎯 领取任务: " + _0x448c85);
    const _0x4ffe15 = await receiveTaskReward(_0x34ba71, _0x448c85, "79");
    if (_0x4ffe15.code === 0) {
      const _0x501ef7 = _0x4ffe15.result?.["reward"] || 0;
      console.log("✅ 领取成功! 获取到 " + _0x501ef7 + " 金币");
      _0x286370++;
      _0xff63a3 += _0x501ef7;
      await sleep(3000);
    } else {
      console.log("❌ 领取失败: " + (_0x4ffe15.message || "未知错误"));
      if (_0x4ffe15.code === 1001 || _0x4ffe15.code === 1002) {
        console.log("ℹ️ 可能已达领取上限");
        _0x559c09 = false;
        break;
      }
    }
    if (_0x286370 < _0x34ba71.maxClaims && _0x559c09 && _0x500281 < _0x34ba71.maxWithdrawals) {
      const _0xe280b3 = random(_0x34ba71.delayMin, _0x34ba71.delayMax);
      console.log("⏱️ 等待 " + _0xe280b3 + " 秒后继续领取...");
      await sleep(_0xe280b3 * 1000);
    }
  }
  console.log("\n📊 查询最终状态...");
  const {
    gold: _0x332575
  } = await getWithdrawPage(_0x34ba71);
  console.log("\n📊 账号 " + _0x34ba71.index + " 统计:");
  console.log("   视频广告成功次数: " + _0x2cba24 + "/" + _0x34ba71.videoTimes);
  console.log("   成功领取任务次数: " + _0x286370 + "/" + _0x34ba71.maxClaims);
  console.log("   提现次数: " + _0x500281 + "/" + _0x34ba71.maxWithdrawals);
  if (_0x1dd6f4 !== undefined && _0x332575 !== undefined) {
    {
      const _0x5378a4 = _0x332575 - _0x1dd6f4;
      console.log("   金币变化: " + _0x1dd6f4 + " -> " + _0x332575 + " (+" + _0x5378a4 + ")");
    }
  }
}
async function main() {
  console.log("\n" + "=".repeat(60));
  console.log("🌸 幸福花开多账号任务领取脚本 (Node.js版)");
  console.log("=".repeat(60));
  console.log("📊 共发现 " + ACCOUNTS.length + " 个账号");
  const _0x2b0ec6 = {
    timeZone: "Asia/Shanghai"
  };
  console.log("⏰ 开始时间: " + new Date().toLocaleString("zh-CN", _0x2b0ec6));
  console.log("=".repeat(60));
  for (const _0x1487aa of ACCOUNTS) {
    {
      await processAccount(_0x1487aa);
      if (_0x1487aa.index < ACCOUNTS.length) {
        {
          const _0x333974 = random(30, 60);
          console.log("\n⏱️ 等待 " + _0x333974 + " 秒后处理下一个账号...");
          await sleep(_0x333974 * 1000);
        }
      }
    }
  }
  console.log("\n" + "=".repeat(60));
  console.log("✅ 所有账号处理完成");
  console.log("=".repeat(60));
}
require.main === module && main().catch(_0x62d7b0 => {
  console.error("\n❌ 程序异常:", _0x62d7b0);
  process.exit(1);
});
const _0x5dd00f = {
  getVideoAd: getVideoAd,
  receiveAdReward: receiveAdReward,
  getWithdrawPage: getWithdrawPage,
  receiveTaskReward: receiveTaskReward,
  withdraw: withdraw,
  processAccount: processAccount,
  main: main
};
module.exports = _0x5dd00f;