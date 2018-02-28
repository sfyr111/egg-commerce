module.exports = {

  /* 更多参数请翻源码 */

  /* 应用AppID */
  appid: 2016091200492877,

  /* 通知URL */
  notifyUrl: 'http://9bqaiq.natappfree.cc/order/alipaycallback',

  /* 应用RSA私钥 请勿忘记 -----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
  merchantPrivateKey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEApsBXKCC0pZmKAAosGCgPfrWKpmyCG32LzZO3XJhuROpgfLYBCPF2t1k3i3o7E6ViCT7nlhZu8/vDszdCyIJhD2fLZEKy0knPTykzpGtp4S7H4wiDuPsQRsJ2qktd8knNzEthN/CXQu+AUj3ggrnkiqDxQ5EbdXQ4sK1VlgJ6t+gWLfepXC4KwtkVwJVIt3s67xghRiOpl2Y+AZL1HIfZvLQJUWzP92Ts/pNnvgotaywKM535kK8CcFrehmXObvYQ7zSauZTcWNcWI1qaKkjG1LGvCU2J4VQU43B2NY9blTpyuL9qxJ9hexP/fAAXToslf2aPAmdeSvvB5xoDZf2X6QIDAQABAoIBAEPoNlY4I3kA8wsbGWPpBI5kXgdyTvXlBcb9bgG+bcGQ9SQ0dm1u8BqwsYcSivZwNmFvhZ5AmoSvtb3JNmAzgFVmvpSg+PPcbRlevRIrUB4NEAfsEsCFNdarIOou8R5XYgDdfcTrLJ5srIRRgJmcHG88JaSPdnA5mVCR9jW14sX7jKrF+mE9zuVlxzEQFBEIKu9pGsqdutsvhfPwZH2kp1ji6Ltd1OxPgymFu3MQW+I7agZB8lqvOQql3/EbOaw6vy1uaqR4qSD6la2ckVlLxdyeDjBZZOKsR0R8SOkzJi9BBDnmx12aDatW4DwZI4uwOBJL4lhJN5ys/+D34wCI5oUCgYEA0InpKu3eoo6h+ghMeGRJ5buKbWjfmI8yUl39eOQ/ip3rO75N/TAFDKSCo3TtaA3ftfhn13MU6EEjDhoyix3NhLGndLHfrrtMM7umYq5P8AafEDjHiHqqo12Wvtg2pw943AFGg8V1EV+luB1m/qbWnA4tRQk1INbQ+A+ulyudrqsCgYEAzLPFi6WCmRoSGMlHX60E7B2nmVXrEVb80qg2qh34ZgLXLOqLt9pQgWkCw0LersKWIwIrFkhd9CTZk7ccpbAYfKlPuIxo4L+zxzqq1g9Z90A3yoVxCQG+RKdl2eGoUwuIj1TnubCy8DPxTyOm3TwJo50i4D/HNEtixXyujqZJA7sCgYBxoeRjFxDMpUoP03vP0l4OB74rVg0YtVanWT3oJP+WyexHNrCKeSMXO4FQDkPbAkxXfM8gsD3BPNUcNxw5f/jgCGoGBXKsZLTmL6c/eFpooUMFdNsNPEJFGJcu0OQe7iheQXeqD+t1lxfXFnZr5n9ks7jpOFYx2bwun2T0TLj0VwKBgC2tb8dZh2rihmdBgsu2sAKAG4X7xhh4cLIRFyGezm70807yh3rfHFfENvmbUlVs1lO5iCPQwiZYkrSDh8DxKoWmwkNMEZsVK+ipDrX1dv3VNp3aaP65hNuM/w0/bXAagr55E7w70bIH5TDjo7h6TSxVRBMGKE1jBQdMaycps+FBAoGAKe7TNAohYjde+Hc6DMad7FPX1vZnMad8khWmw2vE+KAJe2I5VflBMPk6OekUa3l8GLbecIl9+dICbyqpVo9u3c4JI9MkwJGzx6qdEmqT6cumgBay6CE7eX/wIkZQ+/VZVEt2zgrReMNx1NtbHxp8ushGpblQcUKdwqn063gmnOg=\n-----END RSA PRIVATE KEY-----',

  /* 支付宝公钥 如果为空会使用默认值 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
  alipayPublicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs1qN9Jc9Sf+wnRxVHcHruXQq/YjWIe47Ay1e0ujNb8Ga+GS5Vlvg9UoISI1J8GUbNQR7gK2j81h6icbBVbMc4s5ZvPJTIOD0xODxdRH3daY04mkfYnshbu+ri5GhwrlGS9wAFKa57Ksb8P+EUZumNQL7rIJwFlW1UEiF/x252xG+1zplTnLnKkf1ERcPb4fo/kdtBD53bW5TFsY7IJ4NPqj9AnnfDdpFTZsXZ3ixPVz8uY8J5qganVXEieKpH1OSR9us9Egsh2OfR8AvLl1u2Py/qBecvXbggqPEzbNWLbNyJY0iK/KPXiDYiOV+MN/HHgCRXAEqR3g7Whh6ARswZwIDAQAB\n-----END PUBLIC KEY-----',

  /* 支付宝支付网关 如果为空会使用沙盒网关 */
  gatewayUrl: 'https://openapi.alipaydev.com/gateway.do',
};
