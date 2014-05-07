/**
 * This is a test message from RFC5769 - Test Vectors for Session Traversal Utilities for NAT (STUN)
 * https://tools.ietf.org/html/rfc5769
 *
 *
 *
 * 2.3.  Sample IPv6 Response
 *
 * This response uses the following parameter:
 *
 * Password:  "VOkJxbRl1RmTxUk/WvJxBt" (without quotes)
 *
 * Software name:  "test vector" (without quotes)
 *
 * Mapped address:  2001:db8:1234:5678:11:2233:4455:6677 port 32853
 *
 *   01 01 00 48     Response type and message length
 *   21 12 a4 42     Magic cookie
 *   b7 e7 a7 01  }
 *   bc 34 d6 86  }  Transaction ID
 *   fa 87 df ae  }
 *   80 22 00 0b     SOFTWARE attribute header
 *   74 65 73 74  }
 *   20 76 65 63  }  UTF-8 server name
 *   74 6f 72 20  }
 *   00 20 00 14     XOR-MAPPED-ADDRESS attribute header
 *   00 02 a1 47     Address family (IPv6) and xor'd mapped port number
 *   01 13 a9 fa  }
 *   a5 d3 f1 79  }  Xor'd mapped IPv6 address
 *   bc 25 f4 b5  }
 *   be d2 b9 d9  }
 *   00 08 00 14     MESSAGE-INTEGRITY attribute header
 *   a3 82 95 4e  }
 *   4b e6 7b f1  }
 *   17 84 c9 7c  }  HMAC-SHA1 fingerprint
 *   82 92 c2 75  }
 *   bf e3 ed 41  }
 *   80 28 00 04     FINGERPRINT attribute header
 *   c8 fb 0b 4c     CRC32 fingerprint
 *
 */

var Buffer = require('buffer').Buffer;
module.exports = new Buffer([
    0x01, 0x01, 0x00, 0x48, //    Response type and message length
    0x21, 0x12, 0xa4, 0x42, //    Magic cookie
    0xb7, 0xe7, 0xa7, 0x01, // }
    0xbc, 0x34, 0xd6, 0x86, // }  Transaction ID
    0xfa, 0x87, 0xdf, 0xae, // }
    0x80, 0x22, 0x00, 0x0b, //    SOFTWARE attribute header
    0x74, 0x65, 0x73, 0x74, // }
    0x20, 0x76, 0x65, 0x63, // }  UTF-8 server name
    0x74, 0x6f, 0x72, 0x20, // }
    0x00, 0x20, 0x00, 0x14, //    XOR-MAPPED-ADDRESS attribute header
    0x00, 0x02, 0xa1, 0x47, //    Address family (IPv6) and xor'd mapped port number
    0x01, 0x13, 0xa9, 0xfa, // }
    0xa5, 0xd3, 0xf1, 0x79, // }  Xor'd mapped IPv6 address
    0xbc, 0x25, 0xf4, 0xb5, // }
    0xbe, 0xd2, 0xb9, 0xd9, // }
    0x00, 0x08, 0x00, 0x14, //    MESSAGE-INTEGRITY attribute header
    0xa3, 0x82, 0x95, 0x4e, // }
    0x4b, 0xe6, 0x7b, 0xf1, // }
    0x17, 0x84, 0xc9, 0x7c, // }  HMAC-SHA1 fingerprint
    0x82, 0x92, 0xc2, 0x75, // }
    0xbf, 0xe3, 0xed, 0x41, // }
    0x80, 0x28, 0x00, 0x04, //    FINGERPRINT attribute header
    0xc8, 0xfb, 0x0b, 0x4c  //    CRC32 fingerprint
]);
